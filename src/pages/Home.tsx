import React, { useState, useCallback, useMemo } from 'react';
import { Spin, Alert, Pagination, Button, Modal, Result, Layout } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import BookItem from '@components/book/BookItem';
import BookForm from '@components/book/BookForm';
import BookDetails from '@components/book/BookDetails';
import type { Book } from '@types/book';
import usePagination from '@hooks/usePagination';
import useBooks from '@hooks/useBooks';
import './Home.scss';
import config from '@config';

const { Content } = Layout;

const Home: React.FC = () => {
  const {
    books,
    favoriteBookIds,
    status,
    addBook,
    editBook,
    deleteBook,
    toggleFavorite,
  } = useBooks();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const booksPerPage = config.defaultPaginationSize;

  const {
    currentPage,
    paginatedItems: currentBooks,
    totalItems,
    setCurrentPage,
  } = usePagination(books, booksPerPage);

  const handleAddBook = useCallback(() => {
    setEditingBook(null);
    setIsModalVisible(true);
  }, []);

  const handleEditBook = useCallback((book: Book) => {
    setEditingBook(book);
    setIsModalVisible(true);
  }, []);

  const handleViewBook = useCallback((book: Book) => {
    setSelectedBook(book);
    setIsDrawerVisible(true);
  }, []);

  const handleFormSubmit = useCallback(
    (book: Book) => {
      if (editingBook) {
        editBook(book);
      } else {
        addBook(book);
      }
      setIsModalVisible(false);
    },
    [editingBook, addBook, editBook]
  );

  const memoizedCurrentBooks = useMemo(() => currentBooks, [currentBooks]);

  if (status === 'loading') {
    return (
      <Content style={{ margin: '24px 16px 0' }} className="home-page">
        <div className="flex items-center justify-center">
          <Spin size="large" />
        </div>
      </Content>
    );
  }

  if (status === 'failed') {
    return (
      <Alert
        message="Error"
        description="Failed to load books"
        type="error"
        showIcon
      />
    );
  }

  return (
    <Content style={{ margin: '24px 16px 0' }} className="home-page">
      <div className="flex justify-between">
        <h2>Popular Books</h2>
        <Button
          type="primary"
          onClick={handleAddBook}
          style={{ marginBottom: '16px' }}
        >
          Add New Book
        </Button>
      </div>

      <div className="books-container">
        {memoizedCurrentBooks.length === 0 ? (
          <Result
            icon={<SmileOutlined />}
            title="No books available"
            extra={
              <Button type="primary" onClick={handleAddBook}>
                Add New Book
              </Button>
            }
          />
        ) : (
          memoizedCurrentBooks.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              isFavorite={favoriteBookIds.has(book.id)}
              toggleFavorite={() => toggleFavorite(book.id)}
              onView={() => handleViewBook(book)}
              onEdit={
                book.id.toString().startsWith('local')
                  ? () => handleEditBook(book)
                  : undefined
              }
              onDelete={
                book.id.toString().startsWith('local')
                  ? () => deleteBook(book.id)
                  : undefined
              }
            />
          ))
        )}
      </div>

      {memoizedCurrentBooks.length && (
        <Pagination
          current={currentPage}
          pageSize={booksPerPage}
          total={totalItems}
          onChange={setCurrentPage}
          className="pagination"
        />
      )}

      <Modal
        title="Add / Edit Book"
        style={{ top: 20 }}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[]}
      >
        <BookForm
          onSubmit={handleFormSubmit}
          initialData={editingBook || undefined}
        />
      </Modal>

      <BookDetails
        book={selectedBook}
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      />
    </Content>
  );
};

export default Home;
