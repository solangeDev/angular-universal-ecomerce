/// <reference types="cypress" />

context('<footer />', () => {
  before(() => {
    cy.launchMockApi();
    cy.login();
    cy.wait(1000);
  });

  it('should load footer', () => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/');
    cy.get('[data-cy=footer]').should('exist').should('have.class', 'footer');
    cy.get('[data-cy=sub-menu]').should('exist');
    cy.get('[data-cy=footer-tab]').should('exist').as('footerTab');
    cy.get('@footerTab').click({ force: true });
    cy.get('[data-cy=link]').should('exist').should('have.class', 'link').eq(0).click({ force: true });
  });
});
