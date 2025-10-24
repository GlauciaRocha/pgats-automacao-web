//HOOK - Gancho
// before - antes de todos os testes - 1 X ANtes de tudo os testes
// beforeEach - antes de cada teste - Ants de cada testes
// after - depois de todos os testes - 1 X depois de tudo os testes
// afterEach - depois de cada teste - Depois de cada teste

import userData from '../fixtures/exemplo.json' // Importando dados do arquivo fixture
import {
  getRandomNumber,
  getRandomEmail
} from '../support/helpers'; // Importando funções auxiliares

import { faker } from '@faker-js/faker';// Importando a biblioteca faker para gerar dados aleatórios

faker.animal.dog(); // Gera nome de cachorro aleatório

describe('Exercicio1', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('https://automationexercise.com/')     
    cy.get('a[href="/login"]').click()   
  });

  it('Exemplos de Logs', () =>{
    cy.log('STEP:1 : : PGTAS AUTOMACAO WEB CY LOG') // Log simples
    cy.log('STEP:2 : : PGTAS AUTOMACAO WEB CY LOG ')

    cy.log('getRandomNumber: ${getRandomNumber()}')
    cy.log('getRandomEmail: ${getRandomEmail()}')

    cy.log(`Nome do Usuário: ${userData.name}`) // OBS: O objeto importado é 'userData' (minúsculo)
    cy.log(`Email do Usuário: ${userData.email}`) // OBS: O objeto importado é 'userData' (minúsculo)

    cy.log(`Dog Breed: ${faker.animal.dog() }`) 
    cy.log(`Cat Breed: ${faker.animal.cat() }`)
    cy.log(`FullName: ${faker.companyperson.fullName() }`)
 
  
  })


  it.only('Cadastrar um usuário', () => {
       //Arrange = Preparação   
      const timestamp = new Date() .getTime()

      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()          
      
      cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`)
      cy.get('[data-qa="signup-email"]').type(getRandomEmail())
    
      cy.contains('button', 'Signup').click()

      //  radio ou checkboxes -> check
      cy.get('input[type=radio]').check('Mrs')
      //cy.get('#id_get_gender1').check()       
      //cy.get(':nth-child(4) > .top') // os de cima do exemplo da aula não estava funcionando

      cy.get('input#password').type('12345', { log: false} )     // log: false -> não exibe a senha no terminal

      //  Para selecionar um item de um combo box -> select
      cy.get('select[data-qa=days]').select('17')
      cy.get('select[data-qa=months]').select('September')
      cy.get('[data-qa=years]').select('1987')

      // radio ou checkboxes -> check  
      cy.get('input[type=checkbox]#newsletter').check()
      cy.get('input[type=checkbox]#optin').check()

      cy.get('input#first_name').type(faker.person.firstName()) 
      cy.get('input#last_name').type(faker.person.lastName()) 
      cy.get('input#company').type(faker.company.name())
      cy.get('input#address1').type(faker.location.streetAddress()) 
      cy.get('select#country').select('Canada')  
      cy.get('input#state').type(faker.location.state()) 
      cy.get('input#city').type(faker.location.city()) 
      cy.get('[data-qa="zipcode"]').type(faker.location.zipCode()) 
      cy.get('input#mobile_number').type('111 222 3456')

       // Act - Ação
      cy.get('[data-qa="create-account"]') .click()

      // Assert - Verificação
      cy.url().should('include', 'account_created') 
      cy.contains('b' , 'Account Created!').should('have.text', 'Account Created!') 

})

//Comando para rodar npx cypress run > pgtas-logs-cypress.txt
//npx cypress run --headed  -> roda o cypress com a interface visível
//npx cypress run --browser chrome  -> roda o cypress no navegador chrome

  it('Exemplos de Logs', () =>{
  
})

//
  it('Login de Usuário com e-mail e senha corretos', () =>{
    
    cy.get('[data-qa="login-email"]').type('qa-rocha-010203@test.com')
    cy.get('[data-qa="login-password"]').type('Gui120604@')

    cy.get('[data-qa="login-button"]').click()

    cy.get('i,.fa-user').parent().should('contain', 'QA Rocha')
    cy.get ('a[href="/login"]').click()

    cy.get(':nth-child(10) > a').click( )
    .should('include', '/')  
    .and('have.text', 'Logged in as QA Rocha')
 

  });
 
//
  it('Login ede Usuário com e-mail e senha incorretos', () =>{
    
    cy.get('[data-qa="login-email"]').type('q-rocha-010203@test.com')
    cy.get('[data-qa="login-password"]').type('Gui12060@')

    cy.get('[data-qa="login-button"]').click()

    cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!')  
  });

//
  it('Sair do Usuário / Logout de Usuario', () =>{
    //Arrange = Preparação
    
    cy.get('[data-qa="login-email"]').type('qa-rocha-010203@test.com')
    cy.get('[data-qa="login-password"]').type('Gui120604@')

    cy.get('[data-qa="login-button"]').click()
    cy.get('i,.fa-user').parent().should('contain', 'QA Rocha')

    //act - Ação
    cy.get ('a[href="/logout"]').should('be.visible').click()

    // Assert - Verificação
    cy.url().should('contain', 'login')
    
  });

  it('Cadastrar usuário com email já existente', () =>{
    
    cy.get('[data-qa="signup-name"]').type('Gabriel Rocha') 
    cy.get('[data-qa="signup-email"]').type('gabriel-tester-250418@test.com')

    cy.contains('button', 'Signup').click( )

    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
      
  });

  //update - imagem
  it('Enviar um formulário de contato com upload de arquivo',() =>{
    cy.get('a[href="/contact_us"]').click()

    cy.get('[data-qa="name"]').type(userData.name)
    cy.get('[data-qa="email"]').type(userData.email)
    cy.get('[data-qa="subject"]').type(userData.subject)
    cy.get('[data-qa="message"]').type(userData.message)

    cy.fixture('exemplo.json').as('arquivoTeste') // Carregando o arquivo fixture peço exemplo json
    cy.get('input[type=file]').selectFile('@arquivoTeste') // Realizando o upload do arquivo
    //cy.get('input[type=file]').selectFile('cypress/fixtures/example.json') // Outra forma de fazer o upload
    //cy.get('input[type=file]').selectFile('cypress/fixtures/example.png') // Outra forma de fazer o upload

    cy.get('[data-qa="submit-button"]').click()

    //asserts
    cy.get('.status').should('be.visible')
    cy.get('.status').should('have.text','Success! Your details have been submitted successfully.')


  });
    

})