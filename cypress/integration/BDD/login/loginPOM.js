class LoginPOM {
  enterEmail(email) {
    cy.get('input[placeholder="youremail@domain.com"]').type(email);
  }

  enterPassword(password) {
    cy.get('input[name="password"]').type(password);
  }
  
  clickLoginButton() {
    cy.get('button').contains('Login').click();
  }
  
  validateResponseMessage(expectedMessage) {
    cy.get('.response-message').should('have.text', expectedMessage); 
  }

  clearEmail() {
    cy.get('input[placeholder="youremail@domain.com"]').clear(); 
  }
    
  clearPassword() {
    cy.get('input[name="password"]').clear(); 
  }
    
  clearFields() {
    this.clearEmail();
    this.clearPassword();
  }
}
  
export default LoginPOM;
  