import React, { useEffect, useState } from 'react';
import { Book } from '../types/book';
import { Spin, Alert, Pagination } from 'antd';
import BookItem from '../components/bookitem/BookItem';
import { usePagination } from '../hooks/usePagination';
import './Favorites.scss';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const booksPerPage = 5;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const savedFavorites = JSON.parse(
          localStorage.getItem('favorites') || '[]'
        );
        setFavorites(savedFavorites);
        setLoading(false);
      } catch (err) {
        setError('Failed to load favorite books');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const {
    currentPage,
    paginatedItems: currentFavorites,
    totalItems,
    setCurrentPage,
  } = usePagination(favorites, booksPerPage);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className="favorites-page">
      <h2>Favorites</h2>
      <div className="books-container">
        {currentFavorites.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={booksPerPage}
        total={totalItems}
        onChange={setCurrentPage}
        className="pagination"
      />
    </div>
  );
};

export default Favorites;
