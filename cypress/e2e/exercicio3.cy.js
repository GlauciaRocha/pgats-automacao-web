import userData from '../fixtures/example.json' // Importando dados do arquivo fixture

describe('Exercicio3', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('https://automationexercise.com/')     
    cy.get('a[href="/login"]').click()   
  });

  
  
  it('only Enviar um Formulário de Contato com upload de arquivo', () => {
  cy.get('a[href*=contact]').click()

  cy.get('[data-qa="name"]').type(userData.name)
  cy.get('[data-qa="email"]').type(userData.email)
  cy.get('[data-qa="subject"]').type(userData.subject)
  cy.get('[data-qa="message"]').type(userData.message)

  cy.fixture('example.json').as('arquivo')

  cy.get('input[type=file]').selectFile('@arquivo')
  // cy.get('input[type=file]').selectFile('cypress/fixtures/example.json') // Outra forma de fazer o upload
  // cy.get('input[type=file]').selectFile('cypress/fixtures/example.png') // Outra forma de fazer o upload

  cy.get('[data-qa="submit-button"]').click()

  // asserts
  cy.get('.status').should('be.visible')
  cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
});

});

