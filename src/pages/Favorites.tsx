import React, { useEffect, useState } from 'react';
import { Spin, Alert, Pagination, Result } from 'antd';

import type { Book } from '../types/book';
import BookItem from '@components/bookitem/BookItem';
import { usePagination } from '@hooks/usePagination';
import './Favorites.scss';
import BookDetails from '@components/book/BookDetails';
import config from '@/config';
import { HeartOutlined } from '@ant-design/icons';

const Favorites: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const booksPerPage = config.defaultPaginationSize;

  const handleViewBook = (book: Book) => {
    setSelectedBook(book);
    setIsDrawerVisible(true);
  };

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
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className="favorites-page">
      <h2>Favorites</h2>
      {currentFavorites.length === 0 ? (
        <Result icon={<HeartOutlined />} title="No favorite books yet" />
      ) : (
        <>
          <div className="books-container">
            {currentFavorites.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                onView={() => handleViewBook(book)}
              />
            ))}
          </div>
          <Pagination
            current={currentPage}
            pageSize={booksPerPage}
            total={totalItems}
            onChange={setCurrentPage}
            className="pagination"
          />
        </>
      )}
      <BookDetails
        book={selectedBook}
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      />
    </div>
  );
};

export default Favorites;
