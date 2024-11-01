/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe';

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import dashboardOverviewPOM from '../dashboardOverview/dashboardOverviewPOM';
const DashboardOverviewPOM = new dashboardOverviewPOM();
beforeEach(() => {

    cy.intercept('GET', 'https://merchants.seerbitapi.com/api/v1/business/1243516633/analytics?cur=NGN', {
        statusCode: 200,
        body: {
            "payload": {
                "payVolume": 0,
                "pendingDisputes": "NGN 0.0",
                "nextPayout": "NGN 0.0",
                "totalCollection": "NGN 0.0",
                "lastPayout": "NGN 0.0",
                "customers": 3
            },
            "message": "success",
            "status": "success",
            "responseCode": "00"
        }
    }).as('getAnalytics');
});

Given('I navigate to the login screen', function () {
    cy.viewport(1800, 1000);
    cy.visit(Cypress.env("baseUrl"), { timeout: 2000000 });
});

When('I enter {string} and {string}', (email, password) => {
    cy.intercept({
        method: 'POST',
        url: 'https://merchant.seerbitapi.com/authservice/api/v1/auth/login',
    }).as('loginRequest');
    DashboardOverviewPOM.enterEmail(email);
    DashboardOverviewPOM.enterPassword(password);
});

Then('I click the login button', function() {
    DashboardOverviewPOM.clickLoginButton();
    cy.wait(5000)
});

When ('I verify the that the "Business Overview" section is vsible', function(){
    cy.get('body').then($body => {
        if ($body.find('p:contains("Please select your preferred business  profile")').length) {
            cy.get('p').contains('Please select your preferred business  profile').should('exist')
            cy.get(':nth-child(2) > .group').click();
        } else {
            cy.log('sub business does not exist, skipping click.');
        }
    });
    cy.get('body').then($body => {
        if ($body.find('button:contains("Close")').length) {
            cy.get('button').contains('Close').click();
        } else {
            cy.log('"Close" button not found, skipping click.');
        }
    });
    cy.get('h3').contains('Business Overview').should('exist')
    cy.wait('@getAnalytics');
})

Then ('I verify the that the "Business Account" section is vsible', function(){
    
})
Then ('I verify the that the " Transaction Volume" section is vsible', function(){

})
Then ('I verify all API on dashboard endpoints loads Correctly', function(){

})