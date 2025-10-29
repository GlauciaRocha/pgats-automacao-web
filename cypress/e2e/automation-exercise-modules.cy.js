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
  it.only('6Enviar um formulário de contato com upload de arquivo',() =>{
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


it('6Caso de teste 6: Formulário de contato',() =>{
    
    cy.visit('http://automationexercise.com');
    
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('contain.text', 'Home');
    
    cy.contains('Contact us').click();
    
    cy.contains('Get In Touch').should('be.visible');    
    
    cy.get('[data-qa="name"]').type(userData.name)
    cy.get('[data-qa="email"]').type(userData.email)
    cy.get('[data-qa="subject"]').type('Dúvida sobre um produto')
    cy.get('[data-qa="message"]').type(faker.lorem.paragraph(2))
    
    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/exemplo.json', { force: true });
    
    cy.get('[data-qa="submit-button"]').click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.contain('Press OK to continue');
    });
    
    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
    
    cy.contains('Home').click();
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('contain.text', 'Home');
  });  
  
  it('8Deve verificar todos os produtos e os detalhes do primeiro produto', () =>{ 

    cy.visit('http://automationexercise.com');
    
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('contain.text', 'Home');
    
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
  
  cy.visit('http://automationexercise.com');  
  
  cy.url().should('eq', 'https://automationexercise.com/');
  cy.get('body').should('contain.text', 'Home');  
  
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

    cy.visit('http://automationexercise.com');

    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('contain.text', 'Home');

    cy.scrollTo('bottom');
    
    cy.contains('Subscription').should('be.visible');
    
    const email = `teste_${Date.now()}@email.com`; 
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
    
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it.only('Deve permitir registrar, fazer pedido e excluir conta', () => {
    
    // 1. Inicie o navegador
    // 2. Navegue até a URL
    cy.visit('http://automationexercise.com');

    // 3. Verifique se a página inicial está visível
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('contain.text', 'Home');

    // 4. Clique no botão 'Inscrever-se / Login'
    cy.contains('Signup / Login').click();

    // 5. Preencha todos os detalhes na inscrição e crie uma conta
    const nome = 'Glaucia';
    const email = `glaucia_${Date.now()}@teste.com`;
    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    // Preenche formulário de registro
    cy.get('#id_gender2').check();
    cy.get('#password').type('123456');
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1995');
    cy.get('#newsletter').check();
    cy.get('#optin').check();

    cy.get('#first_name').type('Glaucia');
    cy.get('#last_name').type('Rocha');
    cy.get('#company').type('TechCorp');
    cy.get('#address1').type('Rua Exemplo, 123');
    cy.get('#address2').type('Apto 10');
    cy.get('#country').select('Canada');
    cy.get('#state').type('Ontario');
    cy.get('#city').type('Toronto');
    cy.get('#zipcode').type('M4B1B3');
    cy.get('#mobile_number').type('11999999999');
    cy.get('[data-qa="create-account"]').click();

    // 6. Marque 'CONTA CRIADA!' e clique no botão 'Continuar'
    cy.contains('Account Created!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();

    // 7. Verifique 'Conectado como nome de usuário'
    cy.contains(`Logged in as ${nome}`).should('be.visible');

    // 8. Adicione produtos ao carrinho
    cy.contains('Products').click();
    cy.url().should('include', '/products');
    cy.get('.product-overlay').first().invoke('show');
    cy.contains('Add to cart').click();
    cy.contains('Continue Shopping').click();

    cy.get('.product-overlay').eq(1).invoke('show');
    cy.contains('Add to cart').click();
    cy.contains('View Cart').click();

    // 9. Clique no botão 'Carrinho'
    // 10. Verifique se a página do carrinho é exibida
    cy.url().should('include', '/view_cart');
    cy.contains('Shopping Cart').should('be.visible');

    // 11. Clique em Prosseguir para finalizar a compra
    cy.contains('Proceed To Checkout').click();

    // 12. Verifique os detalhes do endereço e revise o pedido
    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');

    // 13. Insira a descrição na área de texto e clique em "Fazer pedido"
    cy.get('textarea[name="message"]').type('Por favor, envie com urgência.');
    cy.contains('Place Order').click();

    // 14. Insira os detalhes do pagamento
    cy.get('[data-qa="name-on-card"]').type('Glaucia Rocha');
    cy.get('[data-qa="card-number"]').type('4111111111111111');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2028');

    // 15. Clique em "Pagar e confirmar pedido"
    cy.get('[data-qa="pay-button"]').click();

    // 16. Verifique a mensagem de sucesso
    cy.contains('Your order has been placed successfully!').should('be.visible');

    // 17. Clique no botão "Excluir conta"
    cy.contains('Delete Account').click();

    // 18. Marque 'CONTA EXCLUÍDA!' e clique em 'Continuar'
    cy.contains('Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });



       

});









