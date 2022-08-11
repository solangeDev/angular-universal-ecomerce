/// <reference types="cypress" />

context('<cart />', () => {
  before(() => {
    cy.launchMockApi();
    cy.login();
    cy.wait(1000);
  });

  it('should load right bar', () => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/');
    cy.get('[data-cy=form-cart]').should('exist');
    cy.get('[data-cy=button-submit-cart]').should('exist').should('have.class', 'button-view-cart').as('buttonSubmit');
  });
  it('should open modal product detail', () => {
    cy.get('[data-cy=button-submit-cart]').should('exist').as('buttonSubmit');
    cy.get('[data-cy=product-list-item]').should('exist').first().click({ force: true });
    cy.get('[data-cy=button-add-to-cart]').should('exist').click({ force: true });
    cy.get('@buttonSubmit').should('exist').click({ force: true });
  });
});
