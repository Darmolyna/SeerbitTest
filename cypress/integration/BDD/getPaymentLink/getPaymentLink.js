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

Given('I open Seerbit login page', function () {
    cy.viewport(1800,1000)
    cy.visit(Cypress.env("url"))
});

When ('I login and check page tour', function(){
    cy.get('#hs-eu-confirmation-button').click()
    cy.get('#email').type(this.data.emailAddress)
    cy.get('#password').type(this.data.password)
    cy.get('[data-testid]').click()


    const condition = cy.get('.py-3').should('exist');
    condition.then((exists) => {
      if (exists) {
        for (let i = 0; i < 4; i++) {
            cy.get('span').contains('Next').click()
        }
        cy.get('button[aria-label="Close"]').click()
      }else {
        cy.log('page overview tour not displayed');
      }
    });
    
})
Then ('I validate successfull login to my account', function(){
    cy.get("span[class='mr-2']").contains('BLESSING').should('exist')
})
Then ('I navigate to payment link page', function(){
    cy.visit('https://www.dashboard.seerbit.com/#/payments/links')
})
When ('I generate a payment link', function(){
    cy.get('.brand-btn').click()
    cy.get("input[name='paymentLinkName']").type('Blessing' + this.Name)
    cy.get(':nth-child(4) > :nth-child(3) > .form-group > .form-control').check()
    cy.get('select[name="currency"]').select('Naira')
    cy.get(':nth-child(6) > :nth-child(3) > :nth-child(2) > .form-group').click()
    cy.get('div:nth-child(6) div:nth-child(3) div:nth-child(2) div:nth-child(1) input:nth-child(1)').click()
    cy.get(':nth-child(8) > .brand-btn').click()
    cy.get('div[role="status"]').contains('Payment link created').should('exist')

    cy.get('tbody tr td').contains(this.Name).then(option => {
        cy.wrap(option).should('exist').contains(this.Name);
    });
})
Then ('I use payment link and use to perform transaction', function(){
    
    cy.visit('https://pay.seerbitapi.com/77438131')
    cy.wait(60000)
    cy.wait('@discount')
    cy.get('p').contains('BY BEEBEE').should('exist')
    cy.get('#firstName').type(this.data.name)
    cy.get('#lastname').type(this.data.lastname)
    cy.get('#email').type(this.data.emailAddress)
    cy.get('#amount').type(Cypress._.random(0, 1e3))
    cy.get('button[class="pay-button  w-3/4"]').click()
    // cy.get('tbody tr td:nth-child(6) img:first').click().then(() => {
    //     // Access the clipboard content
    //     cy.window().then((win) => {
    //         return win.navigator.clipboard.readText();
    //     }).then((clipboardText) => {
    //         cy.log('Clipboard content:', clipboardText);
    //         // Validate and visit the URL if valid
    //         if (clipboardText.startsWith('http')) {
    //             cy.visit(clipboardText);
    //         } else {
    //             throw new Error('Clipboard content is not a valid URL');
    //         }
    //     });
    // });
})