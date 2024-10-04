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

describe('Register Test', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/')
    })
  
    it('verify register page components', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      cy.get('[role="link"]').contains('Sign up').click()
      cy.wait(5000)
      cy.get('[alt="nextui logo"]').should('exist')
      cy.get('[for="first_name"]').should('exist')
      cy.get('[data-slot="inner-wrapper"]').eq(0).should('exist')
      cy.get('[for="last_name"]').should('exist')
      cy.get('[data-slot="inner-wrapper"]').eq(1).should('exist')
      cy.get('[for="userName"]').should('exist')
      cy.get('[data-slot="inner-wrapper"]').eq(2).should('exist')
      cy.get('[for="password"]').should('exist')
      cy.get('[data-slot="inner-wrapper"]').eq(2).should('exist')
      cy.get('[type="button"]').contains('Sign up').should('exist')
      cy.get('.text-center.text-gray-500').contains('Already have an account?').should('exist')
      cy.get('[role="link"]').contains('Login').click()
      // cy.wait(10000)
      // cy.url().should('include', 'http://localhost:3000/login')
    })
  })