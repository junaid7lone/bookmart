import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Layout, notification } from 'antd';

import { Book } from '@types/book';
import BookForm from '@components/book/BookForm';
import './CreateBook.scss';

const { Content } = Layout;

const CreateBook: React.FC = () => {
  const navigate = useNavigate();
  const [localBooks, setLocalBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('localBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const handleFormSubmit = (book: Book) => {
    const updatedBooks = [...localBooks, book];
    setLocalBooks(updatedBooks);
    localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
    notification.success({
      message: `Success`,
      description: 'Book added to collection.',
      placement: 'bottomRight',
    });
    navigate('/');
  };

  return (
    <Content style={{ margin: '24px 16px 0' }} className="create-book-page">
      <h2>Add New Book</h2>
      <article className="">
        <Card>
          <BookForm onSubmit={handleFormSubmit} />
        </Card>
      </article>
    </Content>
  );
};

export default CreateBook;
