/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe';

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPOM from '../login/loginPOM';
const loginPOM = new LoginPOM();

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

})

Then ('I validate create account button is clickable and redirect to account creation screen', function(){


})

Given('I set the viewport to {string}', (device) => {
    if (device === 'iPhone-6') {
        cy.viewport('iphone-6');
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