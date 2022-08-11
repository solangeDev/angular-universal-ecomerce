context('<shipping-address />', () => {
  before(() => {
    cy.launchMockApi();
    cy.login();
    cy.wait(1000);
  });

  it('valid form', () => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/cart');
    cy.get('[data-cy=btn-add-address]').should('exist').click({ force: true });
    cy.get('[data-cy=input-name]').should('exist').type('address');
    cy.get('[data-cy=input-address]').should('exist').type('address');
    cy.get('[data-cy="input-country"]')
      .find('.p-dropdown')
      .click({ force: true })
      .get('.p-dropdown-item')
      .first()
      .click({ force: true });
    cy.get('[data-cy="input-city"]')
      .find('.p-dropdown')
      .click({ force: true })
      .get('.p-dropdown-item')
      .first()
      .click({ force: true });
    cy.get('[data-cy=btn-address]').should('exist').find('button').as('buttonAddress');
    cy.get('@buttonAddress').click({force: true})
  });

  it('edit address', () => {
    cy.get('[data-cy=btn-edit-address]').should('exist').eq(1).click({ force: true });
    cy.get('[data-cy=input-name]').should('exist').type('address edit');
    cy.get('[data-cy=btn-address]').should('exist').find('button').as('buttonAddress');
    cy.get('@buttonAddress').click({force: true})
  })

  it('delete address', () => {
    cy.get('[data-cy=btn-delete-address]').should('exist').eq(1).click({ force: true });
  })

});
