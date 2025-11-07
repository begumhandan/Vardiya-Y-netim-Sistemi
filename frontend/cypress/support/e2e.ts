/// <reference types="cypress" />

import './commands';

// Cypress'in TypeScript desteği için gerekli global tanımlamalar
declare global {
  namespace Cypress {
    interface Chainable {
      // Özel komutlar için interface tanımlamaları buraya eklenebilir
      // Örnek:
      // login(email: string, password: string): Chainable<void>
    }
  }
}