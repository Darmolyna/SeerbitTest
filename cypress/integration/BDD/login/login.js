/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe';

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPOM from '../login/loginPOM';
const loginPOM = new LoginPOM();
const AnalyticsResponse = {
    payload: {
        payVolume: 0,
        pendingDisputes: "NGN 0.0",
        nextPayout: "NGN 0.0",
        totalCollection: "NGN 0.0",
        lastPayout: "NGN 0.0",
        customers: 3,
    },
    message: "success",
    status: "success",
    responseCode: "00",
};

Given('I navigate to the login screen', function () {
    //cy.viewport(1800, 1000);
    cy.visit(Cypress.env("baseUrl"), { timeout: 2000000 });
});

When('I enter {string} and {string}', (email, password) => {
    cy.intercept({
        method: 'POST',
        url: 'https://merchant.seerbitapi.com/authservice/api/v1/auth/login',
    }).as('loginRequest');
    loginPOM.enterEmail(email);
    loginPOM.enterPassword(password);
});

Then('I click the login button', function() {
    loginPOM.clickLoginButton();
});

Then('I validate that the login returns the appropriate response message {string} and status code {string}', (expectedMessage, expectedStatusCode) => {
    cy.wait('@loginRequest').then((interception) => {
        const actualResponseMessage = interception.response.body.message;
        const actualStatusCode = interception.response.statusCode;
        expect(actualResponseMessage).to.eq(expectedMessage);
        expect(actualStatusCode).to.eq(Number(expectedStatusCode)); // Convert to number for comparison
    });
});

When('I validate login button is disabled after entering either username or password', function () {
    const credentials = [
        { email: "olofinblessing@gmail.com", password: "" },  
        { email: "", password: "Password@1" },                
    ];

    credentials.forEach(({ email, password }) => {
        loginPOM.clearFields();
        if (email) {
            loginPOM.enterEmail(email);
        }
        if (password) {
            loginPOM.enterPassword(password);
        }
        cy.get('button').contains('Login').should('be.disabled');
    });
});

When ('I validate forgot password button is clickable and redirect to forgot password screen', function(){
    cy.get('a').contains('Forgot password?').should('have.attr', 'href', '#/auth/recover-password')
    cy.get('a').contains('Forgot password?').click()
    cy.get('h2').contains('Forgot password').should('exist')
    cy.get('span').contains('Return to login ').click()
})

Then ('I validate Sign Up button is clickable and redirect to account creation screen', function(){
    cy.get('a').contains('Sign up').should('have.attr', 'href', '#/auth/register')
    cy.get('a').contains('Sign up').click()
    cy.get('h2').contains('Create an account').should('exist')
    cy.get('a').contains('Sign in').click()
})

When ('I validate google play button is present on login screen and contaiuns link the redirect to play store', function(){
    cy.get('a[href="https://apps.apple.com/ng/app/seerbit-mobile/id6476602836"] img').should('exist')
    cy.get('a[href="https://apps.apple.com/ng/app/seerbit-mobile/id6476602836"]').should('exist')
})

When ('I validate app store button is present on login screen and contaiuns link the redirect to app store', function(){
    cy.get('a[href="https://apps.apple.com/ng/app/seerbit-mobile/id6476602836"] img').should('exist')
    cy.get('a[href="https://apps.apple.com/ng/app/seerbit-mobile/id6476602836"]').should('exist')
})

Given('I set the viewport to {string}', (device) => {
    if (device === 'iPhone-6') {
        cy.viewport('iphone-6');
    } else if (device === 'iphone-xr') {
        cy.viewport('iphone-xr');
    } else if (device === 'iPad-2') {
        cy.viewport('ipad-2');
    } else if (device === 'MacBook-15') {
        cy.viewport('macbook-15');
    } else {
        throw new Error('Unsupported device');
    }
});


Then('I verify the login form is visible and properly aligned on {string}', (device) => {
    cy.get('.items-center').should('be.visible'); 
});

Then('I validate that elements are correctly resized and positioned on {string}', (device) => {
    cy.get('input[placeholder="youremail@domain.com"]').should('be.visible').and('have.css', 'width').and('match', /^[0-9]+px$/);
    cy.get('input[name="password"]').should('be.visible').and('have.css', 'width').and('match', /^[0-9]+px$/);
    cy.get('button').contains('Login').should('be.visible').and('have.css', 'width').and('match', /^[0-9]+px$/);
    cy.get('.items-center').should('have.css', 'margin').and('match', /^[0-9]+px$/);
});

Then('I validate font sizes and element padding on {string}', (device) => {
    cy.get('h2').should('have.css', 'font-size').and('match', /^[0-9]+px$/);
    cy.get('input[placeholder="youremail@domain.com"]').should('have.css', 'font-size').and('match',  /^([0-9]+px\s?)+$/);
    cy.get('input[name="password"]').should('have.css', 'padding').and('match',  /^([0-9]+px\s?)+$/);
    cy.get('button').contains('Login').should('have.css', 'padding').and('match', /^([0-9]+px\s?)+$/);
});

Then('I verify that the logo and images scale correctly on {string}', (device) => {
    //cy.get('img#logo').should('be.visible')
});

Then('I validate there is no content overflow on {string}', (device) => {
    cy.window().then(win => {
        const docHeight = Cypress.$(win.document).height();
        const winHeight = win.innerHeight;
        expect(docHeight).to.be.lte(winHeight); 
    });
});