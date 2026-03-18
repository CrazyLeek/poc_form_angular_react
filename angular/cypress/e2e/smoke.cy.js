describe('Page formulaire - smoke test', () => {
  it('affiche le titre principal', () => {
    cy.visit('/');
    cy.contains('h1', 'Formulaire Tapotons').should('be.visible');
  });
});
