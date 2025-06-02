// // bookstore.cy.js

describe('Bookstore Homepage', () => {
  it('loads books and displays them', () => {
    cy.visit('http://localhost:5173');
    cy.get('[data-cy="book-card"]').should('have.length.at.least', 1);
  });
});

describe('Search Books', () => {
  it('filters books by title', () => {
    cy.visit('http://localhost:5173');
    cy.get('[placeholder*="Search"]').type('Harry');
    cy.get('[data-cy="book-card"]').should('have.length.at.least', 1);
  });
});

describe('Book Details Page', () => {
  it('opens details page when View button is clicked', () => {
    cy.visit('http://localhost:5173');
    cy.get('[data-cy="book-card"]').first().contains('View').click();
    cy.url().should('include', '/book/');
    cy.get('[data-cy="book-details"]').should('exist');
  });
});
