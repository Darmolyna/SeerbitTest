/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe';


import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
beforeEach( function(){ 
    cy.fixture('example').then(function(data)
    {
        this.data = data 
    })
    cy.wrap('Blessing'+ Cypress._.random(0, 1e2)).as('Name')
    cy.intercept('https://discount.cgseerapps.com/discount-service/api/v1/business/1243516633/discounts/checkout').as('discount')
})

Given('I open Seerbit payment link', function () {
    cy.viewport(1800,1000)
    cy.visit("https://checkout.seerbitapi.com/?mid=SBTESTPUBK_vGGdY6a7p01II6iaxmDauC1tEUWcKb7O", {timeout: 2000000}) , {
        onLoad: (contentWindow) => {
          contentWindow.console.log('Page loaded');
        }
    }
    //cy.reload();
    cy.get('img[class="seerbit-logo "]').should('exist');
});