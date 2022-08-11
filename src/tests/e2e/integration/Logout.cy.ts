/// <reference types="cypress" />

context('Logout', () => {
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
    });

    it('should redirect to login page', () => {
        cy.get('[data-cy=p-menu-link]').should('exist').click();
        cy.get('#logout').should('exist').click()
        cy.get('[data-cy=input-email]').should('exist');
        cy.get('[data-cy=input-password]').should('exist');
        cy.get('[data-cy=button-submit]').should('exist');

    });
});
