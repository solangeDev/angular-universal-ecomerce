/// <reference types="cypress" />

context('Product detail', () => {
  before(() => {
    cy.launchMockApi();
    cy.login();
    cy.wait(1000);
  });

  it('should load page and show products list', () => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/');
    cy.get('[data-cy=product-list-item]').should('exist');
    cy.get('[data-cy=product-image]').should('exist');
    cy.get('[data-cy=product-price]').should('exist');
    cy.get('[data-cy=product-name]').should('exist');
    cy.window().then((win) => {
      win.scrollTo(0, 500);
    });
  });

  it('should open modal product detail', () => {
    cy.get('[data-cy=product-list-item]').should('exist').first().click({ force: true });
    cy.get('[data-cy=pdp-img-secondary]').should('exist');
    cy.get('[data-cy=pdp-img-primary]').should('exist');
    cy.get('[data-cy=pdp-type-shipping]').should('exist');
    cy.get('[data-cy=pdp-card]').should('exist');
    cy.get('[data-cy=pdp-name]').should('exist');
    cy.get('[data-cy=pdp-price]').should('exist');
    cy.get('[data-cy=pdp-variant]').should('exist');
    cy.get('[data-cy=button-add-to-cart]').should('exist');
  });

  it('should change tab to Related and load products related list', () => {
    cy.get('[data-cy=pdp-tabs-modal]').should('exist').click({ force: true });
    cy.get('[data-cy=pdp-related-card]').should('exist').first().click({ force: true });
    cy.get('[data-cy=pdp-img-primary]').should('exist');
    cy.get('[data-cy=pdp-type-shipping]').should('exist');
    cy.get('[data-cy=pdp-card]').should('exist');
    cy.get('[data-cy=pdp-name]').should('exist');
    cy.get('[data-cy=pdp-price]').should('exist');
    cy.get('[data-cy=pdp-variant]').should('exist');
    cy.get('[data-cy=button-add-to-cart]').should('exist');
  });
});
