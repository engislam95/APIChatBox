describe("API Sidebar - Swither Behavior", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("renders API switcher", () => {
    cy.contains("Weather").should("be.visible");
    cy.contains("Cat Facts").should("be.visible");
  });

  it("Switch Cat Facts API when clicked", () => {
    cy.get('[aria-label="Switch Cat Facts"]').as("catSwitch");
    cy.get("@catSwitch").should("have.class", "bg-secondary"); // active
    cy.get("@catSwitch").click();
    cy.get("@catSwitch").should("have.class", "bg-gray-400"); // inactive

    // hide from ui
    cy.get(".cat-response").should("not.exist");
  });
});
