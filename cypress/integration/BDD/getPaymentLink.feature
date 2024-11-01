Feature: Seerbit get payment link validation

    Application regression

    @getpaymentLink1
    Scenario: getpaymentLink test
    Given I open Seerbit login page
    When I login and check page tour
    Then I validate successfull login to my account
    Then I navigate to payment link page
    When I generate a payment link
    Then I use payment link and use to perform transaction
    