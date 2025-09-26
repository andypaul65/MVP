describe('MVP UI E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads the MVP UI with title', () => {
    cy.contains('MVP UI').should('be.visible')
  })

  it('displays all tabs', () => {
    cy.get('.cyberpunk-tabs li').should('have.length', 5)
    cy.contains('Debug').should('be.visible')
    cy.contains('Control Panel').should('be.visible')
    cy.contains('Analytics').should('be.visible')
    cy.contains('Settings').should('be.visible')
    cy.contains('Reports').should('be.visible')
  })

  it('switches tabs and displays content', () => {
    // Default first tab
    cy.get('.cyberpunk-content').should('contain', 'Debug Panel - debug')

    // Switch to Control Panel
    cy.contains('Control Panel').click()
    cy.get('.cyberpunk-content').should('contain', 'Control Panel - control')

    // Switch to Analytics
    cy.contains('Analytics').click()
    cy.get('.cyberpunk-content').should('contain', 'Analytics Panel - analytics')

    // Switch to Settings
    cy.contains('Settings').click()
    cy.get('.cyberpunk-content').should('contain', 'Settings Panel - settings')

    // Switch to Reports
    cy.contains('Reports').click()
    cy.get('.cyberpunk-content').should('contain', 'Reports Panel - reports')
  })

  it('applies cyberpunk theme classes', () => {
    cy.get('.cyberpunk-container').should('be.visible')
    cy.get('.cyberpunk-tabs').should('be.visible')
    cy.get('.cyberpunk-content').should('be.visible')
  })

  it('active tab has active-green class', () => {
    cy.contains('Debug').should('have.class', 'active-green')
    cy.contains('Control Panel').should('not.have.class', 'active-green')

    cy.contains('Control Panel').click()
    cy.contains('Control Panel').should('have.class', 'active-green')
    cy.contains('Debug').should('not.have.class', 'active-green')
  })
})