import { faker } from '@faker-js/faker';
class Contato{
    formulário_de_contato(){ 
        const nome = faker.name.firstName();
        const email = faker.internet.email();
        const assunto = 'Dúvida sobre o produto';
        const mensagem = faker.lorem.sentence();
        
        cy.get('[data-qa="name"]').type(nome);
        cy.get('[data-qa="email"]').type(email);
        cy.get('[data-qa="subject"]').type(assunto);
        cy.get('[data-qa="message"]').type(mensagem);
        cy.get('[data-qa="submit-button"]').click();
    }   

} 
    
    
export default new Contato();   
