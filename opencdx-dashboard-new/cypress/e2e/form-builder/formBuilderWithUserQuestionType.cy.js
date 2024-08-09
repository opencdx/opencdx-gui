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

describe('New form-builder E2E Test', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/')
    })
  
    it('should create new form with Component Type as User Question and other data passed', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      cy.get('#email').clear()
      cy.get('#email').type('admin@opencdx.org')
      cy.get('#password').clear()
      cy.get('#password').type('password')
      cy.get('.w-full').contains('Login').click() 
      cy.wait(10000)

      //uploading json file
      cy.get('[data-testid="upload-form"]').parent().find('input[type="file"]').attachFile('./LIDR.R4_(1).json');
          cy.wait(20000)

          //Select COmponent Type as User Question 
          cy.get('span').contains('User Question').click()
          cy.wait(2000)

          //Select Operator
          cy.get('[data-slot="mainWrapper"]').eq(0).click()
          cy.get('span').contains('Equal').click()

          //Select Value
          cy.get('[data-slot="mainWrapper"]').eq(1).click()
          cy.get('li[role="option"]').each(($ele, index) => {
              cy.log($ele.text())
              if(index === 1) {
                cy.wrap($ele).click()             
              }            
            })

          //Select a Rule as Blood Pressure 
          cy.get('[data-slot="input-wrapper"]').eq(0).click()
          cy.get('span').contains('Blood Pressure').click()

          //Select response for rule
          cy.get('[data-slot="input-wrapper"]').eq(1).click()
          cy.get('li[role="option"]').each(($ele, index) => {
            cy.log($ele.text())
            if(index === 3) {
              cy.wrap($ele).click()             
            }            
          })

          //click Save
          cy.get('button').contains('Submit').click()
          
      // We can go even further and check that the default todos each contain
      // the correct text. We use the `first` and `last` functions
      // to get just the first and last matched elements individually,
      // and then perform an assertion with `should`.

      //cy.get('[data-slot="mainWrapper"]').eq(0).click()
      //cy.get('span').contains('Equal').click()
    })
  })
  