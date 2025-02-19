const getElement = (selector) => cy.get(selector);

export default {
  getOpenMenu: () => {
    return getElement('#react-burger-menu-btn');
  },
  getInventorySidebarLink: () => {
    return getElement('[data-test="inventory-sidebar-link"]');
  },
  getAboutSidebarLink: () => {
    return getElement('[data-test="about-sidebar-link"]');
  },
  getLogoutSidebarLink: () => {
    return getElement('[data-test="logout-sidebar-link"]');
  },
  getResetSidebarLink: () => {
    return getElement('[data-test="reset-sidebar-link"]');
  },
  getClosedMenu: () => {
    return getElement('#react-burger-cross-btn');
  },
};
