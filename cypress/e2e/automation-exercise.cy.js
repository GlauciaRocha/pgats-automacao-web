///<reference types="cypress" />
//describe/context- suite ou conjunto de testes em um mesmo arquivo
// it- um teste dentro de um bloco ou conjunto de testes

//descriebe -> Automation Exercise
//  it -> Cadastrar um usuário
//  it -> Teste abcd

describe('Automation Exercise', () => {
    it('Cadastrar um usuário',() => {
      const timestamp = new Date() .getTime()

      //Arrange = Preparação
      cy.viewport('iphone-xr')
      cy.visit('https://automationexercise.com/')   
    
    
      cy.get('a[href="/login"]').click()

      cy.get('[data-qa="signup-name"]').type('QA Tester')

      cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`)
      
      cy.contains('button', 'Signup').click()

      //radio ou checkboxes -> check
      //cy.get('input[type=radio]').check('Mrs')    
     //cy.get('#id_get_gender1').check()
      cy.get('#id_get_gender1').should('be.visible').check()
      
      cy.get('#password').type('12345',{log: false})     // log: false -> não exibe a senha no terminal

      //  Para selecionar um item de um combo box -> select
      cy.get('[data-qa=days]').select('20')
      cy.get('[data-qa=months]').select('September')
      cy.get('[data-qa=years]').select('1992')

      // radio ou checkboxes -> check  
      cy.get('input[type=checkbox]#newsletter').check()
      cy.get('input[type=checkbox]#optin').check()

      cy.get('input#first_name').type('Glaucia') 
      cy.get('input#last_name').type('Rocha') 
      cy.get('input#company').type('Empresa Rocha') 
      cy.get('input#address1').type('Rua teixeira, n 123') 
      cy.get('select#country').select('Canada')  
      cy.get('input#state').type('California') 
      cy.get('input#city').type('Los Angeles') 
      cy.get('input#zipcode').type('90001') 
      cy.get('input#mobile_number').type('111 222 333')

       // Act - Ação
      cy.get('[data-qa="create-account"]') .click()

      // Assert - Verificação
      cy.url().should('include', 'account_created') 
      cy.contains('b' , 'Account Created!').should('have.text', 'Account Created!')
     

})



})



         
          



        