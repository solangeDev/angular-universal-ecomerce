/// <reference types="cypress" />

context('<header />', () => {
  before(() => {
    cy.launchMockApi();
    cy.login();
    cy.wait(1000);
  });

  it('should load header', () => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/');
    cy.get('[data-cy=logo-img]').should('exist').should('have.class', 'logo');
    cy.get('[data-cy=input-search]').should('exist').should('have.class', 'input-search').as('inputSearch');
    cy.get('[data-cy=button-search]').should('exist').as('buttonSearch');
    cy.get('@inputSearch').type('Product Name');
    cy.get('@buttonSearch').should('exist').click({force: true})
  });
});
