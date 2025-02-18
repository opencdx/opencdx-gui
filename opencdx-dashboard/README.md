# OpenCDx Dashboard

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

# About

This project is the dashboard for the OpenCDx platform that contains the questionnaire and ANF form builder.

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [next-themes](https://github.com/pacocoursey/next-themes)

<p>
  <img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
  <img alt="NextJs" src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="npm" src="https://img.shields.io/badge/-NPM-CB3837?style=flat-square&logo=npm&logoColor=white" />
  <img alt="html5" src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
  <img alt="MaterialUI" src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
  <img alt="Prettier" src="https://img.shields.io/badge/-Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white" />
  <img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white" />
  <img alt="Cypress" src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

# Getting Started

## Prerequisites

Before cloning/forking this project, make sure you have the following tools installed:

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)
- [OpenCDx UI Library](https://github.com/opencdx/ui-library)

   - Clone the UI Library in the same parent directory as opencdx-gui (so parent directory contains both opencdx-gui and ui-library)
      ```bash
      git clone git@github.com:opencdx/ui-library.git
   - Under ui-library install project dependencies
      ```bash
      npm install

## Installation

1. Install the project dependencies using npm:
   
   ```bash
   npm install


2. Start the app

   ```bash
    npm start

3.  The URL for the application will be dispalyed in the console logs (e.g http://localhost:3001). To access the application, copy that URL and add /dashboard to the end of the URL (e.g http://localhost:3001/dashboard).

## Cypress

1. Start the Cypress

   ```bash
    npm run cy

2.  Open your web browser to access the application


# Authentication:
- Sign-In: A form for users to enter their credentials (username/email and password). Uses secure practices like hashing and salting passwords.
- Registration: A form to create new accounts. It may include validation for password strength and email format.
- Protected Routes: Some parts of the app (e.g., dashboard) are only accessible to authenticated users.
# Authorization:
- JWT (JSON Web Tokens): A common mechanism for securely transmitting authentication information between the client and server.

# 508 Compliance (Accessibility):
# Semantic HTML: 
The project strictly adheres to semantic HTML structure (headings, lists, etc.), making it easier for screen readers and assistive technologies to interpret content.
Keyboard Navigation: All interactive elements can be accessed and used with a keyboard alone, ensuring that users who cannot use a mouse can still navigate the application.
- Color Contrast: Color choices for text and background meet or exceed minimum contrast ratios for readability, accommodating users with visual impairments.
- Alternative Text: All images have descriptive alternative text (alt text) to convey their meaning to users who cannot see them.
- ARIA Attributes: Where appropriate, ARIA (Accessible Rich Internet Applications) attributes are used to provide additional context for assistive technologies.
- Focus Management: The focus is programmatically managed to ensure a smooth and predictable navigation experience for keyboard-only users.

# Additional Features:

- Internationalization (i18n): Support for multiple languages to reach a broader audience.
- Responsive Design: Ensures the application looks and functions well on various screen sizes (desktops, tablets, mobile devices).
- Unit/Integration Testing: Tests that validate the functionality of individual components and their interactions.



