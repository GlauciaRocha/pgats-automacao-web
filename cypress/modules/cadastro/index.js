import { faker } from '@faker-js/faker';// Importando a biblioteca faker para gerar dados aleatórios

class Cadastro {
    preencherFormularioDePreCadastroCompleto() {

      
    cy.get('#id_gender1').check()
    
    cy.get('input#password').type('12345', { log: false} )     
    
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
    cy.get('input#password').type('12345', { log: false} )     // log: false -> não exibe a senha no terminal
    // Act - Ação
    cy.get('[data-qa="create-account"]') .click()

    // Assert - Verificação
    cy.url().should('include', 'account_created') 
    cy.contains('b' , 'Account Created!').should('have.text', 'Account Created!') 

 }
}

export default new Cadastro() // Instancia da classe e exporta o objeto criado