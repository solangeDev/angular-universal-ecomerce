/// <reference types="cypress" />

context('Login', () => {
  before(() => {
    cy.launchMockApi();
    cy.wait(1000);
  });

  it('should load page and show form login', () => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/login');
    cy.get('[data-cy=input-email]').should('exist').type('Boris@gmail.com');
    cy.get('[data-cy=input-password]').should('exist').type('123');
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
