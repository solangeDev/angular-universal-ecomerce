// load type definitions that come with Cypress module
import jwt from 'jsonwebtoken';
import { environment } from '@environments/environment';
const PRIVATE_KEY = environment.PRIVATE_KEY;
/// <reference types="cypress" />

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      launchMockApi(type?: any): void;
      login(): void;
    }
  }
}
function launchMockApiCommand(type?: any) {
  type = !type || typeof type !== 'string' ? 'default' : type.toLowerCase();

  cy.task('launchMockApiTask', type);
  cy.wait(5000);
  cy.request('https://apit.metises.com/restapify/').as('healthcheck');
  cy.get('@healthcheck').should((response) => {
    // @ts-ignore
    expect(response.status).to.eq(200);
  });
}

function generateToken(){

  const data = {
    "iss": "api.metises.com",
    "aud": "api.metises.com",
    "sub": "575b7c0b0419c906e262d54a",
    "id": "575b7c0b0419c906e262d54a",
    "exp": 8621847003,
    "email": "test@metises.com",
    "enabled": true,
    "verified": true
  };

  return jwt.sign(data, PRIVATE_KEY, {algorithm: 'RS256'});

}

function loginCommand() {
  const user = {
    id: '1',
    name: 'Test',
    lastName: 'Doe',
    email: 'test@gmail.com',
  };
  window.localStorage.setItem('meu', JSON.stringify({ ...user }));
  const token = generateToken();
  window.localStorage.setItem('met', token);
}

Cypress.Commands.add('launchMockApi', launchMockApiCommand);
Cypress.Commands.add('login', loginCommand);
export {};
