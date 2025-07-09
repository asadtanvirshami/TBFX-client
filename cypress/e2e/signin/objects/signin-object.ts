class SigninObjects {
  get email() {
    return cy.get('input[name="email"]');
  }

  get password() {
    return cy.get('input[name="password"]');
  }

  get loginButton() {
    return cy.get('button[type="submit"]');
  }
}

export default SigninObjects;
