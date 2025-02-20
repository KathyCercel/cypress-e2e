import { inventoryPage, menuButton, loginPage } from '../support/pages/index';
import { removeItemWhileVisible } from "../support/cartUtils";

describe('Menu Open and Close Navigation Tests', () => {
    beforeEach(() => {
        loginPage.visit();
        cy.loginUser('standard_user');
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('contain', 'Products');
    });

    it('should open the menu, check the items and cloe', () => {
        menuButton.getOpenMenu()
            .scrollIntoView()
            .should('be.visible')
            .trigger('mouseover')
            .click();

        menuButton.getAllItemsSidebarLink().should('be.visible');
        menuButton.getAboutSidebarLink().should('be.visible');
        menuButton.getLogoutSidebarLink().should('be.visible');
        menuButton.getResetSidebarLink().should('be.visible');

        menuButton.getClosedMenu()
            .should('be.visible')
            .scrollIntoView()
            .trigger('mouseover')
            .click();

        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('contain', 'Products');
    });
});

describe('Inventory Page Tests', () => {
    beforeEach(() => {
        loginPage.visit();
        cy.loginUser('standard_user');
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('contain', 'Products');
    });

    it('should check if inventory items are displayed', () => {
        inventoryPage.getInventoryItems().should('have.length.greaterThan', 0);
    });

    it('should check the description and price of each item', () => {
        inventoryPage.getInventoryItems().each((_, index) => {
            inventoryPage.getItemDescription(index)
                .scrollIntoView()
                .should('be.visible')
                .invoke('text')
                .then((description) => {
                    cy.log(`Item ${index + 1} Description: ${description}`);
                });
    
            inventoryPage.getItemPrice(index)
                .scrollIntoView()
                .should('be.visible')
                .invoke('text')
                .then((price) => {
                    cy.log(`Item ${index + 1} Price: ${price}`);
                });
        });
    });
    
    it('should check the add to cart button for each item', () => {
        removeItemWhileVisible(inventoryPage);

        inventoryPage.getInventoryItems().each((_, index) => {
            inventoryPage.getAddToCartButton(index)
                .scrollIntoView()
                .should('be.visible')
                .invoke('text')
                .then((buttonText) => {
                    cy.log(`Item ${index + 1} Add To Cart: ${buttonText}`);
                });
        });
    });      
});
