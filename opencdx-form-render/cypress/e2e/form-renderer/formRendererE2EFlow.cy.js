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

describe('New form-renderer E2E Test', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:19006/')
    })
  
    it('should take specific questionnaire and able to Submit after entering details', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      cy.get('[placeholder="Email  "]').clear()
      cy.get('[placeholder="Email  "]').type('admin@opencdx.org')
      cy.get('[placeholder="Password"]').clear()
      cy.get('[placeholder="Password"]').type('password')
      cy.get('[role="button"]').contains('Login').click() 
      cy.wait(10000)

      //uploading json file
      cy.xpath('//div[contains(text(), "Take a specific questionnaire")]').click()

          //Select response for rule
        //   cy.get('[data-slot="input-wrapper"]').eq(1).click()
        //   cy.get('li[role="option"]').each(($ele, index) => {
        //     cy.log($ele.text())
        //     if(index === 3) {
        //       cy.wrap($ele).click()             
        //     }            
        //   })

          //click Save
          cy.get('button').contains('Submit').click()
    })
  })