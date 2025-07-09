class SignUpObjects {
  get firstName() {
    return cy.get('input[name="firstName"]');
  }

  get lastName() {
    return cy.get('input[name="lastName"]');
  }

  get email() {
    return cy.get('input[name="email"]');
  }

  get password() {
    return cy.get('input[name="password"]');
  }

  get signUpButton() {
    return cy.get('button[type="submit"]');
  }
}

export default SignUpObjects;
