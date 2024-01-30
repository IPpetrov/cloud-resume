context("GET /counter", () => {
  it("gets the updated visitor counter, which should be higher than 0", () => {
    cy.request("GET", "https://j0mmwoxgh6.execute-api.eu-central-1.amazonaws.com/prod/counter").then((response) => {
      if (response.status === 200 && response.body > 0) {
        cy.get('#cypress-visit-count').should('be.visible')
      } else {
        cy.get('#cypress-visit-count-').should('not.be.visible');
      }
    })
  })
})  