context("GET /visitor-count-api", () => {
  it("gets the updated visitor counter, which should be higher than 0", () => {
    cy.request("GET", "https://j0mmwoxgh6.execute-api.eu-central-1.amazonaws.com/visitor-count-api").then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.greaterThan(0)
    })
  })
})