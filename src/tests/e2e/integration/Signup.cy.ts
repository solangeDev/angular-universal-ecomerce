/// <reference types="cypress" />

context('Signup', () => {
  before(() => {
    cy.launchMockApi();
    cy.wait(1000);
  });

  it('should load page and show form signup', () => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/signup');
    cy.get('[data-cy=input-name]').should('exist').type('Boris');
    cy.get('[data-cy=input-lastname]').should('exist').type('Lopez');
    cy.get('[data-cy=input-email]').should('exist').type('Boris@gmail.com');
    cy.get('[data-cy=input-password]').should('exist').type('testMetises*');
    cy.get('[data-cy=input-confirmedPassword]').should('exist').type('testMetises*');
    cy.get('[data-cy=button-submit]').should('exist').click();

  });

  it('should load page and show products list', () => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/');
    cy.get('[data-cy=product-list-item]').should('exist');
    cy.get('[data-cy=product-card]').should('exist');
    cy.get('[data-cy=product-image]').should('exist');
    cy.get('[data-cy=product-price]').should('exist');
    cy.get('[data-cy=product-name]').should('exist');
  });
});
