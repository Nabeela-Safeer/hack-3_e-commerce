/// <reference types="cypress" />

describe('Home Page Tests', () => {
    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('should show loading fallback initially', () => {
        cy.contains('Loading...').should('exist').should('be.visible');
    });
  
    it('should load the Hero component', () => {
      cy.get('Hero').should('exist'); 
    });
  
    it('should load the Sofas component', () => {
      cy.get('Sofas').should('exist'); 
    });
  });
  