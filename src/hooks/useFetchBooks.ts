import { useState, useEffect, useCallback } from 'react';
import { fetchBooks } from '../services/bookService';
import { Book } from '../types/book';

const useFetchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getBooks = useCallback(async () => {
    try {
      const books = await fetchBooks();
      setBooks(books);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return { books, loading, error };
};

export default useFetchBooks;
