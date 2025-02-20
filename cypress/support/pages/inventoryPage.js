const getElement = (selector) => cy.get(selector);

export default {
    getProductSortContainer: () => {
        return getElement('[data-test="product-sort-container"]');
    },
    getInventoryContainer: () => {
        return getElement('[data-test="inventory-container"]');
    },
    getInventoryItems: () => {
        return getElement('[data-test="inventory-item"]');
    },
    getItemDescription: (index) => {
        return getElement('[data-test="inventory-item-name"]').eq(index);
    },
    getItemPrice: (index) => {
        return getElement('[data-test="inventory-item-price"]').eq(index);
    },
    getAddToCartButton: (index) => {
        return getElement('[data-test^="add-to-cart"]').eq(index);
    },
    checkItemImage: (index) => {
        return getElement(`[data-test="inventory-item"]:nth-of-type(${index + 1}) img`);
    },
    getShoppingCartLink: () => {
        return getElement('[data-test="shopping-cart-link"]');
    },
    addToCartButton: (itemName) => {
        return getElement(`[data-test="add-to-cart-${itemName}"]`)
    },
    removeButton: (itemName) => {
        return getElement(`[data-test="remove-${itemName}"]`)
    },
    shoppingCartBadge: () => {
        return getElement('[data-test="shopping-cart-badge"]')
    },
    shoppingCartLink: () => {
        return getElement('[data-test="shopping-cart-link"]')
    },
    productSortDropdown: () => {
        return getElement('[data-test="product-sort-container"]')
    },
};
