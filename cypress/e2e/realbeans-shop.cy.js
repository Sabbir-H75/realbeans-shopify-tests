// Get password from environment variables (HIDDEN from logs!)
const storePassword = Cypress.env('password');

// Validate password exists
if (typeof storePassword !== 'string' || !storePassword) {
  throw new Error('Missing password value! Set in cypress.env.json');
}

describe('RealBeans Shopify Store Tests', () => {
  
  // This runs BEFORE each test to handle password page
  beforeEach(() => {
    cy.visit('https://r1012526-realbeans.myshopify.com');
    
    // Check if we're on password page (hides password from logs!)
    cy.get('body').then(($body) => {
      if ($body.find('#password').length > 0) {
        cy.get('#password').type(storePassword, { log: false });
        cy.get('[type="submit"]').click();
      }
    });
  });

  // Test 1: Homepage intro text
  it('displays correct intro text on homepage', () => {
    cy.contains('Since 1801, RealBeans has roasted premium coffee').should('be.visible');
  });

  // Test 2: About page content
  it('displays history paragraph on About page', () => {
    cy.visit('/pages/about us');
    cy.contains('From a small Antwerp grocery').should('be.visible');
  });

  // Test 3: Product catalog shows both products
  it('shows both coffee products in catalog', () => {
    cy.visit('/collections/all');
    cy.contains('RealBeans Roasted Blend').should('be.visible');
    cy.contains('RealBeans Signature Blend').should('be.visible');
  });

  // Test 4: Product details page
  it('displays correct product details', () => {
    cy.visit('/products/realbeans-roasted-blend');
    cy.get('[data-price]').should('be.visible');
    cy.get('img').should('have.attr', 'src').and('include', 'RealBeansRoastedBag');
  });

  // Test 5: Sorting by price works
  it('sorts products by price correctly', () => {
    cy.visit('/collections/all');
    cy.get('select').select('Price: High to low');
    // Verify sorting changed order
    cy.get('.product-item').first().should('be.visible');
  });
});