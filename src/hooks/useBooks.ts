import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@store/store';
import { fetchBooks } from '../store/bookSlice';
import { notification } from 'antd';
import type { Book } from '@types/book';
import useLocalStorage from '@hooks/useLocalStorage';

const useBooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, status, error } = useSelector(
    (state: RootState) => state.books
  );
  const [favoriteBookIds, setFavoriteBookIds] = useLocalStorage<Set<string>>(
    'favoriteBookIds',
    new Set(),
    (value) => new Set(value)
  );

  const [localBooks, setLocalBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('localBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const booksFetchedRef = useRef(false);

  useEffect(() => {
    if (!booksFetchedRef.current) {
      dispatch(fetchBooks());
      booksFetchedRef.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === 'failed' && error) {
      notification.error({
        message: 'Error',
        description: error,
        placement: 'bottomRight',
      });
    }
  }, [status, error]);

  const toggleFavorite = useCallback(
    (bookId: string) => {
      setFavoriteBookIds((prevFavoriteBookIds) => {
        const updatedFavoriteBookIds = new Set(prevFavoriteBookIds);
        if (updatedFavoriteBookIds.has(bookId)) {
          updatedFavoriteBookIds.delete(bookId);
          notification.success({
            message: 'Success',
            description: 'Book removed from favorites',
            placement: 'bottomRight',
          });
        } else {
          updatedFavoriteBookIds.add(bookId);
          notification.success({
            message: 'Success',
            description: 'Book added to favorites',
            placement: 'bottomRight',
          });
        }
        return updatedFavoriteBookIds;
      });
    },
    [setFavoriteBookIds]
  );

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
        });
      } catch (err) {
        console.error('Failed to edit book', err);
        notification.error({
          message: 'Error',
          description: 'Failed to update book',
        });
      }
    },
    [localBooks]
  );

  const deleteBook = useCallback(
    (bookId: string) => {
      try {
        const updatedBooks = localBooks.filter((book) => book.id !== bookId);
        setLocalBooks(updatedBooks);
        localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
        notification.success({
          message: 'Success',
          description: 'Book deleted successfully',
        });
      } catch (err) {
        console.error('Failed to delete book', err);
        notification.error({
          message: 'Error',
          description: 'Failed to delete book',
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
    addBook,
    editBook,
    deleteBook,
    favoriteBookIds,
    status,
    error,
    toggleFavorite,
  };
};

export default useBooks;
