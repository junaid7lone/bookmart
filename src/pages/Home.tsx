// src/pages/Home.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Spin, Alert, Pagination, Button } from 'antd';
import { fetchBooks } from '../store/bookSlice';
import BookItem from '../components/bookitem/BookItem';
import { Book } from '../types/book';
import { Layout } from 'antd';
import { usePagination } from '../hooks/usePagination';
import './Home.scss';

const { Content } = Layout;

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, status, error } = useSelector(
    (state: RootState) => state.books
  );
  const [localBooks, setLocalBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('localBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const booksPerPage = 5;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const combinedBooks = [...localBooks, ...books];

  const {
    currentPage,
    paginatedItems: currentBooks,
    totalItems,
    setCurrentPage,
  } = usePagination(combinedBooks, booksPerPage);

  if (status === 'loading') {
    return <Spin size="large" />;
  }

  if (status === 'failed') {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Content style={{ margin: '24px 16px 0' }} className="home-page">
      <div className="books-container">
        {currentBooks.map((book) => (
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
    </Content>
  );
};

export default Home;
