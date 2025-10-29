import { faker } from '@faker-js/faker';
class CarrinhoPage {
  adicionarProdutoAoCarrinho() {
    cy.get('.features_items .product').first().trigger('mouseover');
    cy.contains('Add to cart').click();
    cy.contains('Continue Shopping').click();
  }

  acessarCarrinho() {
    cy.contains('Cart').click();
    cy.url().should('include', 'view_cart');
  }
}
export default new CarrinhoPage();
