describe("Chat Input - Full Flow ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("sends a cat command and receives a new response", () => {
    // 1. Get initial number of cat responses cause i have here preloaded #1
    cy.get(".cat-response").then(($initialResponses) => {
      const initialCount = $initialResponses.length;

      // 2. Type the command in chat input
      cy.get("input[placeholder*='Type a command']").type(
        "get cat another fact"
      );

      // 3. Click Send button
      cy.contains("button", "Send").click();

      // 4. Wait for new cat response count to be greater than initial
      cy.get(".cat-response", { timeout: 7000 }).should(
        "have.length.greaterThan",
        initialCount
      );
    });

    cy.wait(2000);
  });

  it("sends a weather command and receives a new response", () => {
    // 1. Get initial number of weather responses cause i have here preloaded #1
    cy.get(".weather-response").then(($initialResponses) => {
      const initialCount = $initialResponses.length;

      // 2. Type the command
      cy.get("input[placeholder*='Type a command']").type("get weather munich");

      // 3. Click Send button
      cy.contains("button", "Send").click();

      // 4. Wait for new weather response count to be greater than initial
      cy.get(".weather-response", { timeout: 7000 }).should(
        "have.length.greaterThan",
        initialCount
      );
    });
  });
});
