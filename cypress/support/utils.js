import loginPage from './pages/loginPage';

export const getPassword = () => {
    return loginPage.getLoginPassword().then(($inputs) => {
        let password = '';
        $inputs.each((index, input) => {
            const text = Cypress.$(input).text();
            if (text.includes('Password for all users:')) {
                password = text.split(':')[1].trim();
            }
        });
        return password;
    });
};
