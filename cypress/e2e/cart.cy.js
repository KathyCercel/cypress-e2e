import { loginPage, cartPage, inventoryPage } from '../support/pages/index';

describe('Shopping Cart Tests', () => {
    beforeEach(() => {
        loginPage.visit();
        cy.loginUser('standard_user');
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('contain', 'Products');
    });

    it('should add a single item to the cart and verify the cart count', () => {
        inventoryPage.getAddToCartButton(0).click();
        inventoryPage.getShoppingCartLink().should('have.text', '1');
    });

    it('should add multiple items to the cart and verify the cart count', () => {
        inventoryPage.getAddToCartButton(0).click();
        inventoryPage.getAddToCartButton(1).click();
        inventoryPage.getShoppingCartLink().should('have.text', '2');
    });

    it('should remove an item from the cart and verify the updated count', () => {
        inventoryPage.getAddToCartButton(0).click();
        inventoryPage.getAddToCartButton(1).click();
        inventoryPage.getShoppingCartLink().should('have.text', '2');

        cartPage.getRemoveButton('sauce-labs-bolt-t-shirt').click();
        inventoryPage.getShoppingCartLink().should('have.text', '1');
    });
});
