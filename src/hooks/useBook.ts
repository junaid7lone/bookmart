import { useState, useEffect } from 'react';
import { Book } from '../types/book';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchBooks } from '../store/bookSlice';
import { notification } from 'antd';

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
      notification.error({ message: 'Error', description: error });
    }
  }, [status, error]);

  const addBook = (book: Book) => {
    const updatedBooks = [
      ...localBooks,
      { ...book, id: `local-${Date.now()}` },
    ];
    setLocalBooks(updatedBooks);
    localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
    notification.success({
      message: 'Success',
      description: 'Book added successfully',
    });
  };

  const editBook = (book: Book) => {
    const updatedBooks = localBooks.map((b) => (b.id === book.id ? book : b));
    setLocalBooks(updatedBooks);
    localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
    notification.success({
      message: 'Success',
      description: 'Book updated successfully',
    });
  };

  const deleteBook = (bookId: string | number) => {
    const updatedBooks = localBooks.filter((book) => book.id !== bookId);
    setLocalBooks(updatedBooks);
    localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
    notification.success({
      message: 'Success',
      description: 'Book deleted successfully',
    });
  };

  const combinedBooks = [...localBooks, ...books];

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
