import React, { useEffect, useState } from 'react';
import { Spin, Alert, Pagination, Result, notification, Layout } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import type { Book } from '../types/book';
import BookItem from '@components/bookitem/BookItem';
import { usePagination } from '@hooks/usePagination';
import './Favorites.scss';
import BookDetails from '@components/book/BookDetails';
import config from '@/config';

const { Content } = Layout;

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

  const handleRemoveFavorite = (bookId: string) => {
    try {
      const updatedFavorites = favorites.filter((book) => book.id !== bookId);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      notification.info({
        message: `Removed from favorites`,
        placement: 'bottomRight',
      });
    } catch (err) {
      console.error('Failed to remove book from favorites', err);
      notification.error({
        message: 'Error',
        description: 'Failed to remove book from favorites',
      });
    }
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
      <Content style={{ margin: '24px 16px 0' }} className="home-page">
        <div className="flex items-center justify-center">
          <Spin size="large" />
        </div>
      </Content>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Content className="favorites-page">
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
                onRemoveFavorite={() => handleRemoveFavorite(book.id)}
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
    </Content>
  );
};

export default Favorites;
