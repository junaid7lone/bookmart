import React, { useState, useCallback, useMemo } from 'react';
import {
  Layout,
  Spin,
  Alert,
  Pagination,
  Button,
  Modal,
  notification,
} from 'antd';

import BookItem from '@components/bookitem/BookItem';
import BookForm from '@components/book/BookForm';
import BookDetails from '@components/book/BookDetails';
import { Book } from '@types/book';
import { usePagination } from '@hooks/usePagination';
import useBooks from '@hooks/useBook';
import './Home.scss';
import config from '@/config';

const { Content } = Layout;

const Home: React.FC = () => {
  const { books, status, addBook, editBook, deleteBook } = useBooks();
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
      try {
        if (editingBook) {
          editBook(book);
        } else {
          addBook(book);
        }
        setIsModalVisible(false);
      } catch (err) {
        console.error('Failed to submit form', err);
        notification.error({
          message: 'Error',
          description: 'Failed to submit form',
          placement: 'bottomRight',
        });
      }
    },
    [editingBook, addBook, editBook]
  );

  const memoizedCurrentBooks = useMemo(() => currentBooks, [currentBooks]);

  if (status === 'loading') {
    return (
      <div className="mt-10 flex items-center justify-center">
        <Spin size="large" />
      </div>
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
        {memoizedCurrentBooks.map((book) => (
          <BookItem
            key={book.id}
            book={book}
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
        ))}
      </div>

      <Pagination
        current={currentPage}
        pageSize={booksPerPage}
        total={totalItems}
        onChange={setCurrentPage}
        className="pagination"
      />

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
