import { Book } from '../types/book';

const API_URL = 'https://my-json-server.typicode.com/cutamar/mock/books';

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
};

export const fetchBookById = async (id: number): Promise<Book> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch book details');
  }
  return response.json();
};
