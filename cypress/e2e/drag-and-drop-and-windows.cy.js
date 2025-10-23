describe('Drag and Drop and Windows', () => {
  it('Multiple Windows', () => {
    cy.visit('https://the-internet.herokuapp.com/windows')
    

    cy.contains('Click Here')
      .invoke('removeAttr', 'target')
      .click()

    cy.get('h3').should('have.text', 'New Window')

    cy.go('back') //Retorna à página anterior no histórico do navegador.
    cy.get('a[href="/windows/new"]').should('have.text', 'Click Here')//Localiza o link (<a>) cujo atributo href é exatamente "/windows/new" e verifica se o texto contido nele é 'Click Here'. Isso confirma que o teste retornou com sucesso à página inicial, verificando a presença de um elemento específico.

  });

  it('Drag and Drop', () => {
  
  cy.visit('https://the-internet.herokuapp.com/drag_and_drop')
  
  const dataTransfer = new DataTransfer()
  
  cy.contains('A').trigger('dragstart', { dataTransfer })
  cy.contains('B').trigger('drop', { dataTransfer })
  
})
});