context('<order-summary />', () => {
  before(() => {
    cy.launchMockApi();
    cy.login();
    cy.wait(1000);
  });

  it('checkout', () => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/cart');
    cy.get('[data-cy=summary-total]').should('exist').should('have.class', 'col-12 md:col-6');
    cy.get('[data-cy=summary-total-taxes]').should('exist').should('have.class', 'col-12 md:col-6');
    cy.get('[data-cy=summary-total-shipping]').should('exist').should('have.class', 'col-12 md:col-6');

    cy.get('[data-cy=btn-checkout]')
      .should('exist')
      .should('have.class', 'btn-checkout')
      .find('button')
      .as('buttonCheckout');
    cy.get('@buttonCheckout').click({ force: true });
  });
});
