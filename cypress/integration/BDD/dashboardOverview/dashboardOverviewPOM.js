class dashboardOverviewPOM {
  enterEmail(email) {
    cy.get('input[placeholder="youremail@domain.com"]').type(email);
  }
  
  enterPassword(password) {
    cy.get('input[name="password"]').type(password);
  }

  clickLoginButton() {
    cy.get('button').contains('Login').click();
  }
}
export default dashboardOverviewPOM;