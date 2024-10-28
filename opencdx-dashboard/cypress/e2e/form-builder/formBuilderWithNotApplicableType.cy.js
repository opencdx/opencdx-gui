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
      cy.visit('http://localhost:3000/dashboard')
    })
  
    it('should create new form with Component Type as Not Applicable and other data passed', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      cy.get('#email').clear()
      cy.get('#email').type('admin@opencdx.org')
      cy.get('#password').clear()
      cy.get('#password').type('password')
      cy.get('.w-full').contains('Login').click() 
      cy.wait(10000)

      cy.get('[data-testid="upload-form"]').parent().find('input[type="file"]').attachFile('./LIDR.R4.json');

          //cy.get('[type="button"]').eq(0).click()
          cy.wait(20000)
          cy.get('span').contains('Not Applicable').click()
          cy.wait(2000)
          cy.get('[data-slot="mainWrapper"]').eq(0).click()
          cy.get('span').contains('Not Equal').click()

          //Select Value
          cy.get('[data-slot="mainWrapper"]').eq(1).click()
          cy.get('li[role="option"]').each(($ele, index) => {
              cy.log($ele.text())
              if(index === 1) {
                cy.wrap($ele).click()             
              }            
            })

          //Time Tab
          //clear lower bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(0).clear()
          cy.get('[data-slot="input-wrapper"]').eq(0).type('80')

          //select lower bound radio as required
          cy.get('div').contains('Not Specified').eq(0).click()

          //clear upper bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(1).clear()
          cy.get('[data-slot="input-wrapper"]').eq(1).type('120')

          //clear sematic field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(2).clear()
          cy.get('[data-slot="input-wrapper"]').eq(2).type('5 seconds')

          //clear resolution field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(3).clear()
          cy.get('[data-slot="input-wrapper"]').eq(3).type('1 seconds')

          //click Subject of Record tab
          cy.get('[data-slot="tabContent"]').contains('Subject of Record').click()

          //clear ID field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(0).clear()
          cy.get('[data-slot="input-wrapper"]').eq(0).type('Test_ID')

          //clear Practitioner Value field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(1).clear()
          cy.get('[data-slot="input-wrapper"]').eq(1).type('Test_Practitioner')

          //clear Code field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(2).clear()
          cy.get('[data-slot="input-wrapper"]').eq(2).type('Test_Code')

          //click Authors tab
          cy.get('[data-slot="tabContent"]').contains('Authors').click()

          //clear ID field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(0).clear()
          cy.get('[data-slot="input-wrapper"]').eq(0).type('Test_ID')

          //clear Practitioner Value field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(1).clear()
          cy.get('[data-slot="input-wrapper"]').eq(1).type('Test_Practitioner')

          //clear Code field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(2).clear()
          cy.get('[data-slot="input-wrapper"]').eq(2).type('Test_Code')

          //click Subject of Information tab
          cy.get('[data-slot="tabContent"]').contains('Subject of Information').click()

          //clear Subject of Information field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(0).clear()
          cy.get('[data-slot="input-wrapper"]').eq(0).type('Test_Subject')

          //click Topic tab
          cy.get('[data-slot="tabContent"]').contains('Topic').click()

          //clear Topic field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(0).clear()
          cy.get('[data-slot="input-wrapper"]').eq(0).type('Test_Topic')

          //click Type tab
          cy.get('[data-slot="tabContent"]').contains('Type').click()

          //select a type value from drop down
          cy.get('[data-slot="mainWrapper"]').eq(2).click()
          cy.get('span').contains('Performance').click()

          //click Circumstance Type tab
          cy.get('[data-slot="tabContent"]').contains('Circumstance Choice').click()

          //select Circumstance Type value from drop down
          cy.get('[data-slot="mainWrapper"]').eq(2).click()
          cy.get('span').contains('Performance Circumstance').click()

          //select Status field value
          cy.get('[data-slot="input-wrapper"]').eq(0).clear()
          cy.get('[data-slot="input-wrapper"]').eq(0).type('Active')

          //enter or select Result values
          //clear Lower Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(1).clear()
          cy.get('[data-slot="input-wrapper"]').eq(1).type('Test_Lower')

          //select Include Lower Bound radio
          cy.get('div').contains('Yes').eq(0).click()

          //clear Upper Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(2).clear()
          cy.get('[data-slot="input-wrapper"]').eq(2).type('Test_Upper')

          //clear Sematic field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(3).clear()
          cy.get('[data-slot="input-wrapper"]').eq(3).type('10 seconds')

          //clear Resolution field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(4).clear()
          cy.get('[data-slot="input-wrapper"]').eq(4).type('5 seconds')

          //clear Health Risk field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(5).clear()
          cy.get('[data-slot="input-wrapper"]').eq(5).type('Severe')

          //enter or select Normal Range values
          //clear Lower Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(6).clear()
          cy.get('[data-slot="input-wrapper"]').eq(6).type('50')

          //clear Upper Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(7).clear()
          cy.get('[data-slot="input-wrapper"]').eq(7).type('150')

          //clear Sematic field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(8).clear()
          cy.get('[data-slot="input-wrapper"]').eq(8).type('5 seconds')

          //clear Resolution field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(9).clear()
          cy.get('[data-slot="input-wrapper"]').eq(9).type('2 seconds')

          //enter or select Timing values
          //clear Lower Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(10).clear()
          cy.get('[data-slot="input-wrapper"]').eq(10).type('10')

          //clear Upper Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(11).clear()
          cy.get('[data-slot="input-wrapper"]').eq(11).type('50')

          //clear Sematic field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(12).clear()
          cy.get('[data-slot="input-wrapper"]').eq(12).type('8 seconds')

          //clear Resolution field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(13).clear()
          cy.get('[data-slot="input-wrapper"]').eq(13).type('4 seconds')

          //enter or select Participant values
          //clear Practitioner field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(14).clear()
          cy.get('[data-slot="input-wrapper"]').eq(14).type('Test_Participant')

          //clear Practitioner Value field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(15).clear()
          cy.get('[data-slot="input-wrapper"]').eq(15).type('Test_Participant_Value')

          //clear Code field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(16).clear()
          cy.get('[data-slot="input-wrapper"]').eq(16).type('Test_Code')

          //Select a Rule as Blood Pressure 
          cy.get('[data-slot="input-wrapper"]').eq(17).click()
          cy.get('span').contains('Blood Pressure').click()

          //Select response for rule
          cy.get('[data-slot="input-wrapper"]').eq(18).click()

          cy.get('li[role="option"]').each(($ele, index) => {
            cy.log($ele.text())
            if(index === 1) {
              cy.wrap($ele).click()             
            }            
          })

          //click Save
          cy.get('button').contains('Submit').click()
    })
  })
  