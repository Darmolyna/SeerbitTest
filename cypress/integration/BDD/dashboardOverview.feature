Feature: Seerbit Merchant Dashboard Login Page Validation

  Application regression

@login @regression @allApp
  Scenario Outline: Verify Dashboard Loads Correctly
  Given I navigate to the login screen
  When I enter "<email>" and "<password>"
  Then I click the login button
  When I verify the that the "Business Overview" section is vsible
  Then I verify the that the "Business Account" section is vsible
  Then I verify the that the " Transaction Volume" section is vsible
  Then I verify all API on dashboard endpoints loads Correctly
  
   Examples:
    | email                        | password      | 
    | olofinblessing@gmail.com     | Password@4     | 