import { loginPage, cartPage, inventoryPage, menuButton } from '../support/pages/index';

// How cart-contents Works in LocalStorage
// "cart-contents": "[4,1]" means items with IDs 4 and 1 are in the cart.
// This data persists across navigation and reloads.
// The cart does not rely on API calls, so we must validate UI updates and localStorage changes.

describe("API Tests: Cart Validation & Order Summary", () => {
  beforeEach(() => {
    loginPage.visit();

    cy.clearLocalStorage();

    cy.loginUser('standard_user');
    cy.url().should('include', '/inventory');
    cy.get('.title').should('contain', 'Products');
  });

  it("should add an item to the cart and update localStorage", () => {
    inventoryPage.addToCartButton("sauce-labs-backpack").click();
    inventoryPage.shoppingCartBadge().should("contain", "1");

    cy.window().then((win) => {
      const cartData = JSON.parse(win.localStorage.getItem("cart-contents") || "[]");
      expect(cartData.length).to.eq(1);
      expect(cartData).to.include(4);
    });

    cy.reload();
    inventoryPage.shoppingCartBadge().should("contain", "1");
  });

  it("should remove an item from the cart and update localStorage", () => {
    inventoryPage.addToCartButton("sauce-labs-backpack").click();
    inventoryPage.shoppingCartBadge().should("contain", "1");

    inventoryPage.shoppingCartLink().click();
    cartPage.removeFromCartButton("sauce-labs-backpack").click();

    inventoryPage.shoppingCartBadge().should("not.exist");

    cy.window().then((win) => {
      const cartData = JSON.parse(win.localStorage.getItem("cart-contents") || "[]");
      expect(cartData.length).to.eq(0);
    });
  });

  it("should persist cart state across navigation and reload", () => {
    inventoryPage.addToCartButton("sauce-labs-backpack").click();
    inventoryPage.shoppingCartBadge().should("contain", "1");

    inventoryPage.shoppingCartLink().click();
    cartPage.cartList().should("exist");

    menuButton.getOpenMenu().click();
    menuButton.getAllItemsSidebarLink().click();
    inventoryPage.shoppingCartBadge().should("contain", "1");

    cy.reload();
    inventoryPage.shoppingCartBadge().should("contain", "1");
  });

  // This is commented out since needs to be part of the bug
  // expected '[4]' to be empty in results
  // more details in cypress/bug-reports/clear-localStorage-on-logout.md
  //
  // it("should clear localStorage on logout", () => {
  //   inventoryPage.addToCartButton("sauce-labs-backpack").click();
  //   inventoryPage.shoppingCartBadge().should("contain", "1");

  //   menuButton.getOpenMenu().click();
  //   menuButton.getLogoutSidebarLink().click();

  //   cy.url().should("eq", "https://www.saucedemo.com/");

  //   cy.window().then((win) => {
  //     expect(win.localStorage.getItem("cart-contents")).to.be.empty;
  //   });

  //   cy.reload();
  //   inventoryPage.shoppingCartBadge().should("not.exist");
  // });
});