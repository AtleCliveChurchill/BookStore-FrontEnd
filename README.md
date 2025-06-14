# BookStore-FrontEnd

This repository contains the frontend for the BookStore application, built with React. Follow the instructions below to get the project running on your local machine for development and testing purposes.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js:** The latest Long-Term Support (LTS) version is recommended. You can download it from [nodejs.org](https://nodejs.org/).
* **npm (Node Package Manager):** npm comes bundled with Node.js.

## Getting Started

1.  **Clone the Repository:**
    Open your terminal or command prompt and clone this repository to your local machine:
    
    git clone 
    cd BookStore-FrontEnd
    

2.  **Install Dependencies:**
    Once inside the project directory, install all the necessary project dependencies:
    
    npm install

## Running the Application

To start the development server and run the Front-End application locally:


- npm run dev
This command will typically start the application on http://localhost:5173 (or another port if 5173 is in use). Check your terminal output for the exact URL.

Running Tests (Cypress)
This project uses Cypress for End-to-End (E2E) testing.

Open the Cypress Test Runner:
Navigate to the project's root directory in your terminal and run:

- npx cypress open
Configure E2E Testing (if first time):
If you are running Cypress for the first time in this project, it might guide you through a brief E2E testing configuration process. Follow the on-screen prompts.

Choose E2E Testing and a Browser:

In the Cypress Test Runner, select "E2E Testing".
Then, choose your preferred browser (e.g., Electron, Chrome, Firefox, Edge) to run the tests. Click "Start E2E Testing in [Browser Name]".
Run the Tests:

The Cypress Test Runner will display a list of your test spec files (e.g., *.cy.js or *.cy.tsx).
Click on an individual spec file to run its tests, or use the "Run all specs" option if available.
