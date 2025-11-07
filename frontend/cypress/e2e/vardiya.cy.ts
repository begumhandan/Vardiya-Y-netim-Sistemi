/// <reference types="cypress" />

describe("🎥 Vardiya Sistemi Demo Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500); // Sayfa tam yüklensin
  });

  it("Ana sayfa yükleniyor", () => {
    cy.contains("Vardiya Yönetim Sistemi").should("be.visible");
    cy.wait(1000);
  });

  it("Yeni personel eklenebilmeli", () => {
    cy.get('[data-testid="personnel-name-input"]').type("Test Personel");
    cy.wait(500);
    cy.get('[data-testid="add-personnel-button"]').click();
    cy.wait(1000);
    cy.contains("Personel eklendi").should("exist");
    cy.wait(500);
    cy.get('[data-testid="personel-item"]').should("contain", "Test Personel");
    cy.wait(1000);
  });

  it("Yeni vardiya oluşturulabilmeli", () => {
    cy.wait(1000);
    cy.get('[data-testid="vardiya-personel"]').click();
    cy.wait(500);
    cy.get('[data-testid^="shift-personnel-option-"]').first().click();
    cy.wait(500);

    cy.get('[data-testid="vardiya-date"]').type("2025-11-07");
    cy.wait(500);
    cy.get('[data-testid="vardiya-start-time"]').type("09:00");
    cy.wait(500);
    cy.get('[data-testid="vardiya-end-time"]').type("17:00");
    cy.wait(500);
    cy.get('[data-testid="shift-notes-input"]').type("Sabah vardiyası");
    cy.wait(1000);

    cy.get('[data-testid="create-vardiya-button"]').click();
    cy.wait(1000);

    cy.contains("Vardiya başarıyla oluşturuldu").should("be.visible");
    cy.wait(1000);
    cy.get('[data-testid="vardiya-item"]').should("have.length.greaterThan", 0);
    cy.wait(1500);
  });
});
