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

//import { navegarParaLogin } from '../modules/menu'

import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
//import { use } from 'react';

faker.animal.dog(); // Gera nome de cachorro aleatório

describe('Exercicio1', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('https://automationexercise.com/')  

   //menu.navegarParaLogin()
    cy.navegarParaLogin()   
  });  

  it('1Cadastrar um usuário', () => {      
    login.preencherFormularioDePreCadastro()
    
    cadastro.preencherFormularioDePreCadastroCompleto()  
    
    // Assert - Verificação deixar no arquivo de teste
    cy.url().should('includes', 'account_created')
    cy.contains('b', 'Account Created!')
    cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')  

})

//
  it('2Login de Usuário com e-mail e senha corretos', () =>{  
    login.preencherFormularioDeLogin(userData.user, userData.password)
    
    //cy.get('i,.fa-user').parent().should('contain', userData.name)
    cy.contains(userData.name).should('be.visible')
    cy.get ('a[href="/logout"]').should('be.visible')

    cy.get(':nth-child(10) > a')
    .should('be.visible')
    .and('contain', userData.name)

    //cy.contains('b', userData.name)
  cy.contains(`Logged in as ${userData.name}`).should('be.visible')
  });
 
//
  it('3Login ede Usuário com e-mail e senha incorretos', () =>{  
   login.preencherFormularioDeLogin(userData.user, 123456)  

   cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!')  
  });

  it('4Logout de Usuario', () =>{
    login.preencherFormularioDeLogin(userData.user, userData.password)
    menu.efetuarLogout()

    // Assert - Verificação (mantendo arquivo de teste)
    cy.url().should('contain', 'login')
    cy.contains('Login to your account')
    cy.get('a[href="/logout"]').should('not.exist')
    cy.get('a[href="/login"]').should('contain', 'Signup / Login')
       
  });

  it('5Cadastrar usuário com email já existente no sistema', () =>{
    
    cy.get('[data-qa="signup-name"]').type( userData.name )
    cy.get('[data-qa="signup-email"]').type(userData.email)

    cy.contains('button', 'Signup').click( )

    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')      
  });

  //update - imagem
  it('6Enviar um formulário de contato com upload de arquivo',() =>{
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










