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
      cy.get('[role="button"]').click() 
      cy.wait(5000)

      //
      cy.xpath('//div[contains(text(), "Take a specific questionnaire")]').click()
      cy.xpath('(//div[contains(text(), "View")])[7]').click()
      //cy.xpath('(//input[@data-testid="text-input-outlined"])[1]').clear()
      cy.xpath('(//input[@data-testid="text-input-outlined"])[1]').type('100')
      /*cy.xpath('(//select[@aria-label="Select option"])[1]').select('Male')
      cy.xpath('(//select[@aria-label="Select option"])[2]').select('No')
      cy.xpath('(//select[@aria-label="Select option"])[3]').select('No')
      cy.xpath('(//select[@aria-label="Select option"])[4]').select('No')
      cy.xpath('(//select[@aria-label="Select option"])[5]').select('No')

      cy.xpath('(//input[@data-testid="text-input-outlined"])[2]').type('25/12/2022')
      cy.xpath('(//input[@data-testid="text-input-outlined"])[3]').type('2022')
      cy.xpath('(//input[@data-testid="text-input-outlined"])[4]').type('Blood Report')
      cy.xpath('(//input[@data-testid="text-input-outlined"])[5]').type('Disease')
      cy.xpath('(//input[@data-testid="text-input-outlined"])[6]').type('Exhausted')
      cy.xpath('(//input[@data-testid="text-input-outlined"])[7]').type('Weekly')
      cy.xpath('(//input[@data-testid="text-input-outlined"])[8]').type('Bad')
      cy.xpath('(//input[@data-testid="text-input-outlined"])[9]').type('Tired')*/

      cy.xpath('(//div[text()="No"])[1]').click()
      // cy.xpath('(//select[@aria-label="Select option"])[1]').select('Adult')
      // cy.xpath('(//select[@aria-label="Selec t option"])[2]').select('Left')
      // cy.xpath('(//div[text()="No"])[2]').click()
      // cy.xpath('(//div[text()="No"])[3]').click()

      //Submit the questionnaire
      cy.xpath('//div[text()="Submit"]').click()

      //go to Home
      //cy.xpath('//div[text()="Home"]').click()
    })
  })