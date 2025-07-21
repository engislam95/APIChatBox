describe("Global Filtering", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    // Intercept API data if needed
    cy.intercept("GET", "https://catfact.ninja/fact", {
      fixture: "cat.json",
    }).as("getCat");
    cy.intercept(
      "GET",
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true",
      { fixture: "weather.json" }
    ).as("getWeather");
  });

  it("should filter results across all cat panel", () => {
    cy.get('[data-testid="global-filter"]').type("cat");
    cy.get(".cat-response").should("contain.text", "Cat");
    cy.wait(2000);
  });

  it("should filter results across all waether panel", () => {
    cy.get('[data-testid="global-filter"]').type("weather");
    cy.get(".weather-response").should("contain.text", "Weather");
  });
});
