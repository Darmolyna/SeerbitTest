Feature: Seerbit Merchant Dashboard Login Page Validation

  Application regression

@login @regression @allApp
  Scenario Outline: Login Test
    Given I navigate to the login screen
    When I enter "<email>" and "<password>"
    Then I click the login button
    Then I validate that the login returns the appropriate response message "<expectedMessage>" and status code "<expectedStatusCode>"

  Examples:
    | email                        | password      | expectedMessage                        | expectedStatusCode |
    | waterbottle@mailsac.com     | EK69KF98F7   | success                                | 200                |
    | waterbottle@mailsac.com     | Password@1    | Wrong username/password combination     | 200                |
    | taiwo@ymail.com     | Password@1    | Login credential does not exist.     | 200                |

@login @regression @allApp
Scenario: validate login button is disabled if user did not enter either username or password
    Given I navigate to the login screen
    When I validate login button is disabled after entering either username or password

@login @regression @allApp
Scenario: validate forgot password and create account button is clickable on login screen
  Given I navigate to the login screen
  When I validate forgot password button is clickable and redirect to forgot password screen
  Then I validate create account button is clickable and redirect to account creation screen

@responsiveness @login @allApp
Scenario Outline: Validate login screen responsiveness on {device}
    Given I set the viewport to "<device>"
    When I navigate to the login screen
    Then I verify the login form is visible and properly aligned on "<device>"
    Then I validate that elements are correctly resized and positioned on "<device>"
    Then I validate font sizes and element padding on "<device>"
    Then I verify that the logo and images scale correctly on "<device>"

  Examples:
    | device    |
    | iPhone-6  |  # Mobile
    | iPad-2    |  # Tablet
    | MacBook-15|  # Desktop