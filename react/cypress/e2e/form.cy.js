describe("The Home Page", () => {
  it("Submit the form without entering nothing (flaky test)", () => {
    cy.visit("/");

    cy.get('[data-cy="btn-submit"]').click();

    cy.get('[data-cy="error-last-name"]'); // flaky test :)
  });
});
