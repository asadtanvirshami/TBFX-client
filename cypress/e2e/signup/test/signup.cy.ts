import SignUpObjects from "../objects/signup-object";

const signup = new SignUpObjects();

describe("SignUp Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/auth/signup");
  });

  it("should fill in the firstName, lastName, email and password fields and click signup but full due to registered email", () => {
    signup.firstName.type("Asad");
    signup.lastName.type("Khan");
    signup.email.type("asadworkemail@gmail.com");
    signup.password.type("12345678");
    signup.signUpButton.click();
  });

  it("should fill in the firstName, lastName, email and password fields and click signup and register successfully.", () => {
    signup.firstName.type("Asad");
    signup.lastName.type("Khan");
    signup.email.type("asvdtanvir@gmail.com");
    signup.password.type("12345678");
    signup.signUpButton.click();
  });
});
