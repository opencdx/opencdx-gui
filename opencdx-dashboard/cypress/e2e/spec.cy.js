describe('template spec', () => {
  it('passes', () => {
    cy.viewport(1250, 900) // Set viewport to 550px x 750px

    cy.visit('http://localhost:3000/');
    cy.wait(1000);
    cy.get('[data-testid="login-btn"]').click();
    cy.wait(1000);
    cy.visit('http://localhost:3000/form-builder');
    cy.wait(1000);
    cy.get('input[type=file]').selectFile('cypress/downloads/alpha.json', { force: true, action: 'drag-drop' });
    cy.wait(1000);
    cy.get('#user-form-json').click();
    cy.wait(1000);
    cy.get('#close-dialog').click();
    cy.wait(1000);
    cy.get('#anf-statement-json').click();
    cy.wait(1000);
    cy.get('#close-dialog').click();
    cy.wait(1000);
    cy.get('input[type=checkbox]').click();
    cy.wait(1000);
    cy.get('[data-testid="1. Upper Range (SYSTOLIC) - 3079919224534accordion-header"]').eq(0).click();
    cy.get('[data-testid="1. Upper Range (SYSTOLIC) - 3079919224534accordion-content"]').should('be.visible');
    cy.wait(1000);

    // Select radio button by value
    cy.get('input[type="radio"][value="ANF_STATEMENT_TYPE_MAIN"]').check();
    cy.get('input[type="radio"][value="ANF_STATEMENT_TYPE_MAIN"]').should('be.checked');
    cy.wait(1000);
    cy.log('test');
    cy.get('[data-testid="Anf Statementaccordion-header"]').eq(0).click();
    cy.get('[data-testid="Anf Statementaccordion-content"]').should('be.visible');
    cy.wait(1000);
    cy.get('#simple-tab-6').click();
    cy.wait(1000);
    cy.get('[data-testid="system-variables-button"]').click();
    cy.wait(1000);
    cy.get('[data-testid="{{REPLACE_3079919224534)}}"]').click();
    cy.get('[data-testid="system-variable-close-btn"]').click();
    cy.wait(1000);
    cy.get('[name="item.0.item.0.anfStatementConnector[0].anfStatement.performanceCircumstance.result.resolution"]').type('REPLACE_3079919224534');
    cy.get('[name="item.0.item.0.anfStatementConnector[0].anfStatement.performanceCircumstance.result.resolution"]').invoke('val').should('equal', 'REPLACE_3079919224534');
    cy.wait(1000);
    cy.get('[data-testid="save-btn"]').click();
    cy.wait(1000);
    cy.log('test end');
  });
});
