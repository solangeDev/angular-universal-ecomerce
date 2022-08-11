/// <reference types="cypress" />

context('Products List', () => {
  before(() => {
    cy.launchMockApi();
    cy.login();
    cy.wait(1000);
  });

  it('should load page and show products list', () => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/');
    cy.get('[data-cy=product-list-item]').should('exist');
    cy.get('[data-cy=product-card]').should('exist');
    cy.get('[data-cy=product-image]').should('exist');
    cy.get('[data-cy=product-price]').should('exist');
    cy.get('[data-cy=product-name]').should('exist');
    cy.window().then((win) => {
      win.scrollTo(0, 500);
    });
  });
});
