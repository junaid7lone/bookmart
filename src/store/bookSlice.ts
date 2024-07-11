import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Book } from '../types/book';
// import axios from 'axios';
import { data as dummyBooks } from '../services/list' assert { type: json };

interface BooksState {
  books: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  status: 'idle',
  error: null,
};

// Thunk to fetch books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  // const response = await axios.get('https://my-json-server.typicode.com/cutamar/mock/books');
  // return response.data;

  // Simulate a delay to mimic an API call
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Return dummy data
  return dummyBooks;
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default booksSlice.reducer;
