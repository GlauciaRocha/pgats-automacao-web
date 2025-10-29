import userData from '../fixtures/exemplo.json' 
import {
  getRandomNumber,
  getRandomEmail
} from '../support/helpers'; 

import { faker } from '@faker-js/faker';

import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'

describe('Trabalho Final', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('https://automationexercise.com/')  

   //menu.navegarParaLogin()
    cy.navegarParaLogin()   
  });  

  it('1Cadastrar um usuário', () => {      
    login.preencherFormularioDePreCadastro()
    
    cadastro.preencherFormularioDePreCadastroCompleto()    
    
    cy.url().should('includes', 'account_created')
    cy.contains('b', 'Account Created!')
    cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')  

})

//
  it('2Login de Usuário com e-mail e senha corretos', () =>{  
    login.preencherFormularioDeLogin(userData.user, userData.password)    
    
    cy.contains(userData.name).should('be.visible')
    cy.get ('a[href="/logout"]').should('be.visible')

    cy.get(':nth-child(10) > a')
    .should('be.visible')
    .and('contain', userData.name)
    
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
  
  it('6Formulário de contato',() =>{    
            
    cy.contains('Contact us').click();
    
    cy.contains('Get In Touch').should('be.visible');
           
    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/exemplo.json', { force: true });

    cy.on('window:alert', (str) => {
      expect(str).to.contain('Press OK to continue');
    
    cy.get('[data-qa="submit-button"]').click();
        
    });    

    cy.wait(500);

    cy.get('body').should('contain.text', 'Success! Your details have been submitted successfully.');
    
    cy.contains('Home').click();
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('contain.text', 'Home');
  });  
  
  it('8Deve verificar todos os produtos e os detalhes do primeiro produto', () =>{ 
      
    cy.contains('Products').click();
    
    cy.url().should('include', '/products');
    cy.contains('All Products').should('be.visible');
    
    cy.get('.features_items').should('be.visible');
    cy.get('.product-image-wrapper').should('have.length.greaterThan', 0);
    
    cy.get('.choose a').first().click();
    
    cy.url().should('include', '/product_details/');
    cy.get('.product-information').should('be.visible');
    
    cy.get('.product-information h2').should('be.visible'); 
    cy.get('.product-information p').eq(0).should('contain.text', 'Category'); 
    cy.get('.product-information span span').should('contain.text', 'Rs'); 
    cy.get('.product-information p').eq(1).should('contain.text', 'Availability'); 
    cy.get('.product-information p').eq(2).should('contain.text', 'Condition'); 
    cy.get('.product-information p').eq(3).should('contain.text', 'Brand'); 
  });

  it('9Pesquisar Produto', () => {   
      
  cy.contains('Products').click();
  
  cy.url().should('include', '/products');
  cy.contains('All Products').should('be.visible');  
  
  const produto = 'Dress';
  cy.get('#search_product').type(produto);
  cy.get('#submit_search').click();  
  
  cy.contains('Searched Products').should('be.visible');  
  
  cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
  
  cy.get('.features_items .productinfo p').then(($items) => {
    const textos = $items.map((i, el) => Cypress.$(el).text().toLowerCase()).get();
    const encontrou = textos.some((t) => t.includes(produto.toLowerCase()));
    expect(encontrou, `Nenhum dos produtos contém "${produto}"`).to.be.true;
  });

});

it('10Verificar assinatura na página inicial', () => {
    
    cy.scrollTo('bottom');
    
    cy.contains('Subscription').should('be.visible');
    
    const email = `teste_${Date.now()}@email.com`; 
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
    
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it.only('15Fazer pedido: Registrar antes de finalizar a compra', () => {         
  cy.contains('Signup / Login').click();

  const nome = faker.person.firstName();
  const email = faker.internet.email();

  cy.get('[data-qa="signup-name"]').type(nome);
  cy.get('[data-qa="signup-email"]').type(email);
  cy.contains('button', 'Signup').click();

  cadastro.preencherFormularioDePreCadastroCompleto();

  cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
  cy.contains('Continue', { timeout: 15000 }).scrollIntoView().should('be.visible').click();

  cy.contains(`Logged in as ${nome}`).should('be.visible');

  cy.contains('Products').click();
  cy.get('.product-image-wrapper').first().scrollIntoView().trigger('mouseover');
  cy.contains('Add to cart').first().click();

  cy.contains('View Cart').click();

  cy.url().should('include', '/view_cart');
  cy.contains('Shopping Cart').should('be.visible');

  cy.contains('Proceed To Checkout').scrollIntoView().click();

  cy.contains('Address Details').should('be.visible');
  cy.contains('Review Your Order').should('be.visible');

  cy.get('textarea[name="message"]').type('Por favor, entregar entre 9h e 18h.');

  cy.contains('Place Order').scrollIntoView().click();

  cy.get('[data-qa="name-on-card"]').type(nome);
  cy.get('[data-qa="card-number"]').type('4111111111111111');
  cy.get('[data-qa="cvc"]').type('123');
  cy.get('[data-qa="expiry-month"]').type('12');
  cy.get('[data-qa="expiry-year"]').type('2028');

  cy.contains('Pay and Confirm Order').scrollIntoView().click();

  cy.contains('Congratulations! Your order has been confirmed!', { timeout: 20000 });

  cy.contains('Delete Account').scrollIntoView().click();
  cy.contains('Account Deleted!', { timeout: 10000 }).should('be.visible');
  cy.contains('Continue').click();
});


});










