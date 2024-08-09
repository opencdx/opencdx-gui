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

describe('New form-builder E2E Test with Associated ANF Statement Component Type', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/')
    })
  
    it('Create form from scratch', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      cy.get('#email').clear()
      cy.get('#email').type('admin@opencdx.org')
      cy.get('#password').clear()
      cy.get('#password').type('password')
      cy.get('.w-full').contains('Login').click() 
      cy.wait(10000)

      cy.get('[data-testid="upload-form"]').parent().find('input[type="file"]').attachFile('./alpha.anf.json');
          cy.wait(10000) 
          cy.wait(10000)
          cy.get('span').contains('Associated ANF Statement').click()
          cy.wait(2000)
          cy.get('[data-slot="mainWrapper"]').eq(0).click()
          cy.get('span').contains('Not Equal').click()

          //dynamically and randomly select Equal sometimes and Not Equal sometimes for Operator
          // const options = ['Equal', 'Not Equal']
          // const randomIndex = Math.floor(Math.random() * options.length)
          // const selectedOption = options[randomIndex]
          // cy.get('[data-slot="mainWrapper"]').eq(0).select(selectedOption)

          if(cy.get('[data-slot="mainWrapper"]'))
          /*cy.get('[data-slot="mainWrapper"]').eq(1).click()
          cy.get('span').contains('SARS-CoV-2').click()
          cy.get('div').contains('Time').click()
          
          cy.get('li[role="option"]').each(($ele, index) => {
            cy.log($ele.text())
            if(index === 1) {
              cy.wrap($ele).click()             
            }            
          })*/

          cy.get('[data-slot="base"]').eq(6).clear()
          cy.get('[data-slot="base"]').eq(6).type('50')

          //Time Tab
          //clear lower bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(1).clear()
          cy.get('[data-slot="input-wrapper"]').eq(1).type('80')

          //select lower bound radio as required
          cy.get('div').contains('Not Specified').eq(0).click()

          //clear upper bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(2).clear()
          cy.get('[data-slot="input-wrapper"]').eq(2).type('120')

          //select upper bound radio as required
          //cy.get('div').contains('Not Specified').eq(1).click()

          //clear sematic field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(3).clear()
          cy.get('[data-slot="input-wrapper"]').eq(3).type('5 seconds')

          //clear resolution field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(4).clear()
          cy.get('[data-slot="input-wrapper"]').eq(4).type('2 seconds')

          //click Subject of Record tab
          cy.get('[data-slot="tabContent"]').contains('Subject of Record').click()

          //clear ID field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(1).clear()
          cy.get('[data-slot="input-wrapper"]').eq(1).type('Test_ID')

          //clear Practitioner Value field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(2).clear()
          cy.get('[data-slot="input-wrapper"]').eq(2).type('Test_Practitioner')

          //clear Code field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(3).clear()
          cy.get('[data-slot="input-wrapper"]').eq(3).type('Test_Code')

          //click Authors tab
          cy.get('[data-slot="tabContent"]').contains('Authors').click()

          //clear ID field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(1).clear()
          cy.get('[data-slot="input-wrapper"]').eq(1).type('Test_ID')

          //clear Practitioner Value field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(2).clear()
          cy.get('[data-slot="input-wrapper"]').eq(2).type('Test_Practitioner')

          //clear Code field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(3).clear()
          cy.get('[data-slot="input-wrapper"]').eq(3).type('Test_Code')

          //click Subject of Information tab
          cy.get('[data-slot="tabContent"]').contains('Subject of Information').click()

          //clear Subject of Information field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(1).clear()
          cy.get('[data-slot="input-wrapper"]').eq(1).type('Test_Subject')

          //click Topic tab
          cy.get('[data-slot="tabContent"]').contains('Topic').click()

          //clear Topic field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(1).clear()
          cy.get('[data-slot="input-wrapper"]').eq(1).type('Test_Topic')

          //click Type tab
          cy.get('[data-slot="tabContent"]').contains('Type').click()

          //select a type value from drop down
          cy.get('[data-slot="mainWrapper"]').eq(1).click()
          cy.get('span').contains('Request').click()

          //click Circumstance Type tab
          cy.get('[data-slot="tabContent"]').contains('Circumstance Choice').click()

          //select Circumstance Type value from drop down
          cy.get('[data-slot="mainWrapper"]').eq(1).click()
          cy.get('span').contains('Request Circumstance').click()

          //select Status field value
          cy.get('[data-slot="input-wrapper"]').eq(1).clear()
          cy.get('[data-slot="input-wrapper"]').eq(1).type('Active')

          //enter or select Result values
          //clear Lower Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(2).clear()
          cy.get('[data-slot="input-wrapper"]').eq(2).type('-50')

          //select Include Lower Bound radio
          cy.get('div').contains('Yes').eq(0).click()

          //clear Upper Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(3).clear()
          cy.get('[data-slot="input-wrapper"]').eq(3).type('20')

          //select Include Upper Bound radio
          //cy.get('div').contains('Yes').eq(1).click()

          //clear Sematic field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(4).clear()
          cy.get('[data-slot="input-wrapper"]').eq(4).type('10 seconds')

          //clear Resolution field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(5).clear()
          cy.get('[data-slot="input-wrapper"]').eq(5).type('5 seconds')

          //clear Health Risk field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(6).clear()
          cy.get('[data-slot="input-wrapper"]').eq(6).type('Severe')

          //enter or select Normal Range values
          //clear Lower Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(7).clear()
          cy.get('[data-slot="input-wrapper"]').eq(7).type('50')

          //clear Upper Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(8).clear()
          cy.get('[data-slot="input-wrapper"]').eq(8).type('150')

          //clear Sematic field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(9).clear()
          cy.get('[data-slot="input-wrapper"]').eq(9).type('5 seconds')

          //clear Resolution field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(10).clear()
          cy.get('[data-slot="input-wrapper"]').eq(10).type('2 seconds')

          //enter or select Timing values
          //clear Lower Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(11).clear()
          cy.get('[data-slot="input-wrapper"]').eq(11).type('10')

          //clear Upper Bound field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(12).clear()
          cy.get('[data-slot="input-wrapper"]').eq(12).type('50')

          //clear Sematic field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(13).clear()
          cy.get('[data-slot="input-wrapper"]').eq(13).type('8 seconds')

          //clear Resolution field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(14).clear()
          cy.get('[data-slot="input-wrapper"]').eq(14).type('4 seconds')

          //enter or select Participant values
          //clear Practitioner field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(15).clear()
          cy.get('[data-slot="input-wrapper"]').eq(15).type('Test_Participant')

          //clear Practitioner Value field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(16).clear()
          cy.get('[data-slot="input-wrapper"]').eq(16).type('Test_Participant_Value')

          //clear Code field and enter new value
          cy.get('[data-slot="input-wrapper"]').eq(17).clear()
          cy.get('[data-slot="input-wrapper"]').eq(17).type('Test_Code')

          //Select a Rule as Blood Pressure 
          cy.get('[data-slot="input-wrapper"]').eq(18).click()
          cy.get('span').contains('Blood Pressure').click()

          //Select response for rule
          cy.get('[data-slot="input-wrapper"]').eq(19).click()
          //cy.get('span').contains('What was the test kit device used?').click()
          //cy.get('span').contains('Contact ID').click()

          cy.get('li[role="option"]').each(($ele, index) => {
            cy.log($ele.text())
            if(index === 1) {
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