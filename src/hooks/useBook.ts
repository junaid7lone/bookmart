import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';

import { Book } from '@types/book';
import { AppDispatch, RootState } from '@store/store';
import { fetchBooks } from '@store/bookSlice';

const useBooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, status, error } = useSelector(
    (state: RootState) => state.books
  );
  const [localBooks, setLocalBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('localBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'failed' && error) {
      notification.error({
        message: 'Error',
        description: error,
        placement: 'bottomRight',
      });
    }
  }, [status, error]);

  const addBook = useCallback(
    (book: Book) => {
      try {
        const updatedBooks = [
          ...localBooks,
          { ...book, id: `local-${Date.now()}` },
        ];
        setLocalBooks(updatedBooks);
        localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
        notification.success({
          message: 'Success',
          description: 'Book added successfully',
          placement: 'bottomRight',
        });
      } catch (err) {
        console.error('Failed to add book', err);
        notification.error({
          message: 'Error',
          description: 'Failed to add book',
          placement: 'bottomRight',
        });
      }
    },
    [localBooks]
  );

  const editBook = useCallback(
    (book: Book) => {
      try {
        const updatedBooks = localBooks.map((b) =>
          b.id === book.id ? book : b
        );
        setLocalBooks(updatedBooks);
        localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
        notification.success({
          message: 'Success',
          description: 'Book updated successfully',
          placement: 'bottomRight',
        });
      } catch (err) {
        console.error('Failed to edit book', err);
        notification.error({
          message: 'Error',
          description: 'Failed to update book',
          placement: 'bottomRight',
        });
      }
    },
    [localBooks]
  );

  const deleteBook = useCallback(
    (bookId: string | number) => {
      try {
        const updatedBooks = localBooks.filter((book) => book.id !== bookId);
        setLocalBooks(updatedBooks);
        localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
        notification.success({
          message: 'Success',
          description: 'Book deleted successfully',
          placement: 'bottomRight',
        });
      } catch (err) {
        console.error('Failed to delete book', err);
        notification.error({
          message: 'Error',
          description: 'Failed to delete book',
          placement: 'bottomRight',
        });
      }
    },
    [localBooks]
  );

  const combinedBooks = useMemo(
    () => [...localBooks, ...books],
    [localBooks, books]
  );

  return {
    books: combinedBooks,
    status,
    error,
    addBook,
    editBook,
    deleteBook,
  };
};

export default useBooks;
