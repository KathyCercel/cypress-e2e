import { loginPage } from '../support/pages/index';
import { inventoryPage } from '../support/pages/index';

describe('Lighthouse Performances on Login Page Test', () => {
    it('should check the performance of the home page', () => {
        loginPage.visit();


        cy.task('lighthouse', {
            performance: 85,
            accessibility: 90,
            'best-practices': 85,
            seo: 90,
            pwa: 50
        }).then((lighthouseReport) => {
            cy.log('Lighthouse Report:', lighthouseReport);
        });
    });
});

describe('Lighthouse Performances on Inventory Page Test', () => {
    it('should check the performance of the home page', () => {
        loginPage.visit();
        cy.loginUser('standard_user');
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('contain', 'Products');

        cy.task('lighthouse', {
            performance: 85,
            accessibility: 90,
            'best-practices': 85,
            seo: 90,
            pwa: 50
        }).then((lighthouseReport) => {
            cy.log('Lighthouse Report:', lighthouseReport);
        });
    });
});

describe('Lighthouse Performances on Cart Page Test', () => {
    it('should check the performance of the home page', () => {
        loginPage.visit();
        cy.loginUser('standard_user');

        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('contain', 'Products');

        inventoryPage.getShoppingCartLink().click();

        cy.url().should('include', '/cart.html');

        cy.task('lighthouse', {
            performance: 85,
            accessibility: 90,
            'best-practices': 85,
            seo: 90,
            pwa: 50
        }).then((lighthouseReport) => {
            cy.log('Lighthouse Report:', lighthouseReport);
        });
    });
});