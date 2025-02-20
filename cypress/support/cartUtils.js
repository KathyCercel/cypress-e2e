export const removeItemWhileVisible = (inventoryPage) => {
    cy.get('body').then(($body) => {
        const removeButtons = $body.find('[data-test^="remove-"]');
        
        if (removeButtons.length > 0) {
            cy.get('[data-test^="remove-"]').first().should('be.visible').click();
            cy.wait(200);
            removeItemWhileVisible(inventoryPage);
        } else {
            return;
        }
    });
};
