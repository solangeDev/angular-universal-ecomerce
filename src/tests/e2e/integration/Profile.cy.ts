/// <reference types="cypress" />

context('<profile />', () => {
  before(() => {
    cy.launchMockApi();
    cy.login();
    cy.wait(1000);
  });

  it('invalid form', () => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/profile');
    cy.get('[data-cy=image-upload]').should('exist');
    cy.get('[data-cy=form-profile]').should('exist').should('have.class', 'form');
    cy.get('[data-cy=input-name]').should('exist').should('have.class', 'p-inputtext').type('Username');
    cy.get('[data-cy=input-lastname]').should('exist').should('have.class', 'p-inputtext').type('Lastname');
    cy.get('[data-cy=input-email]').should('exist').should('have.class', 'p-inputtext').type('user@gmail.com');
    cy.get('[data-cy=input-password]').should('exist').should('have.class', 'p-inputtext').type('password');
    cy.get('[data-cy=input-password-confirmed]').should('exist').should('have.class', 'p-inputtext').type('password2');
    cy.get('[data-cy=button-submit]').should('exist').as('buttonSubmit');
    cy.get('@buttonSubmit').should('exist').click({force: true})
  });

  it('valid form', () => {
    cy.get('[data-cy=input-password-confirmed]').should('exist').should('have.class', 'p-inputtext').as('InputConfirmed').clear();
    cy.get('@InputConfirmed').type('password2');
    cy.get('[data-cy=button-submit]').should('exist').as('buttonSubmit');
    cy.get('@buttonSubmit').should('exist').click({force: true})
  });
});
