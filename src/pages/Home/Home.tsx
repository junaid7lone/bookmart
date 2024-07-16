import React, { useState, useCallback, useMemo } from 'react';
import { Spin, Alert, Pagination, Button, Modal, Result, Layout } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import BookItem from '@/components/book/BookItem/BookItem';
import BookForm from '@/components/book/BookForm/BookForm';
import BookDetails from '@/components/book/BookDetails/BookDetails';
import type { Book } from '@types/book';
import usePagination from '@hooks/usePagination';
import useBooks from '@hooks/useBooks';
import styles from './Home.module.scss';
import { DEFAULT_PAGINATION_SIZE } from '@config';

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

  const {
    currentPage,
    paginatedItems: currentBooks,
    totalItems,
    setCurrentPage,
  } = usePagination(books, DEFAULT_PAGINATION_SIZE);

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
      <Content className={styles.homePage}>
        <div className="flex items-center justify-center">
          <Spin size="large" />
        </div>
      </Content>
    );
  }

  if (status === 'failed') {
    return (
      <Content className={styles.homePage}>
        <Alert
          message="Error"
          description="Failed to load books"
          type="error"
          showIcon
        />
      </Content>
    );
  }

  return (
    <Content className={styles.homePage}>
      <div className={styles.pageHeading}>
        <h2>Popular Books</h2>
        <Button
          type="primary"
          onClick={handleAddBook}
          style={{ marginBottom: '16px' }}
        >
          Add New Book
        </Button>
      </div>

      <div className={styles.booksContainer}>
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
          pageSize={DEFAULT_PAGINATION_SIZE}
          total={totalItems}
          onChange={setCurrentPage}
          className={styles.pagination}
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
