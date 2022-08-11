/// <reference types="cypress" />

context('Recover password', () => {
    before(() => {
        cy.launchMockApi();
        cy.wait(1000);
    });

    it('should show login and redirect to recover password and send email', () => {
        const email: string = "Lopez98boris@gmail.com";
        cy.once('uncaught:exception', () => false);
        cy.visit('/login');
        cy.get('[data-cy=recover-password]').should('exist').click();
        cy.get('[data-cy=input-email]').should('exist').type(email);
        cy.get('[data-cy=button-submit]').should('exist').click();

    });

    it('should show new password form', () => {
        cy.once('uncaught:exception', () => false);
        cy.visit('/recover-password/tokenwzxczcmz0cd');
        cy.get('[data-cy=input-password]').should('exist').type('testTest*123');
        cy.get('[data-cy=input-confirmedPassword]').should('exist').type('testTest*123');
        cy.get('[data-cy=button-submit]').should('exist').click({force:true});
    });
});
