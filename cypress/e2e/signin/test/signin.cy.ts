import SigninObjects from "../objects/signin-object";

const signin = new SigninObjects();

describe("Signin Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/auth/signin");
  });

  it("should fill in the email and password fields and click login", () => {
    signin.email.type("asadworkemail@gmail.com");
    signin.password.type("12345678");
    signin.loginButton.click();
  });
});
