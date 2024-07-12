# 📚 BookMart

BookMart is a React application for managing books. It allows users to view books fetched from an API, add new books, edit and delete existing books locally, and manage favorite books. The application also supports pagination to display books in a paginated manner.

## ✨ Features

- 📖 View books fetched from an API
- ➕ Add new books
- ✏️ Edit and delete existing books locally
- ❤️ Manage favorite books
- 📄 Pagination to display books in a paginated manner
- 📱 Responsive design

## 🛠️ Technologies Used

- ⚛️ React
- 🛠️ Redux Toolkit
- 📝 TypeScript
- 💅 Ant Design
- 🎣 react-hook-form
- 🎨 SCSS
- 🌐 Axios
- 🚦 react-router-dom
- ⚡ Vite

## 📦 Installation

1. Clone the repository:

`git clone https://github.com/junaid7lone/bookmart.git`

2. Navigate to the project directory:

`cd bookmart`

3. Install the dependencies:

`npm install`

4. Start the development server:

`npm run dev`

## 🚀 Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Use the sidebar to navigate between the different sections of the app:
   - 🏠 Home: View all books
   - ❤️ Favorites: View your favorite books
   - ➕ Add New Book: Add a new book to the collection

## ➕ Adding a New Book

1. Navigate to the "Add New Book" page using the sidebar.
2. Fill out the form with the book's title, author, cover image URL, publication date, and description.
3. Click "Add Book" to save the book to the local state.

## ✏️ Editing a Book

1. Click the "Edit" button on the book card you wish to edit.
2. Update the book information in the form.
3. Click "Update Book" to save the changes to the local state.

## 🗑️ Deleting a Book

1. Click the "Delete" button on the book card you wish to delete.
2. The book will be removed from the local state.

## ❤️ Managing Favorites

1. Click the heart icon on a book card to add it to your favorites.
2. Navigate to the "Favorites" page using the sidebar to view your favorite books.
