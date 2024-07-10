import React from 'react';
import useFetchBooks from '../hooks/useFetchBooks';
import BookItem from './BookItem';

const BookList: React.FC = () => {
  const { books, loading, error } = useFetchBooks();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
