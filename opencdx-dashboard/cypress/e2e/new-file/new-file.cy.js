//import Page from '@/app/page'
/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/dashboard/form-builder')
    })
  
    it('displays two todo items by default', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.

  //     cy.get('[data-testid="upload-form"]')
  // .attachFile('./Simple.json');
  cy.get('[data-testid="upload-form"]').parent().find('input[type="file"]').attachFile('./Simple.json');
  //     cy.get('[data-testid="upload-form"]') // Locate the button
  // .parent() // Find the parent element
  // .find('input[type="file"]') // Find the hidden input
  // .attachFile('./Simple.json') 
      // cy.get('[alt="opencdx logo s"]').should('exist')
      // cy.get('#email').should('exist')
      // cy.get('#password').should('exist')
      // cy.get('[class="focus:outline-none"]').should('exist')
      // cy.get('.w-full').contains('Sign in').click()
      // cy.get('[role="link"]').contains('Don\'t have an account?').should('exist')
      
  
      // We can go even further and check that the default todos each contain
      // the correct text. We use the `first` and `last` functions
      // to get just the first and last matched elements individually,
      // and then perform an assertion with `should`.
    })
  })
  