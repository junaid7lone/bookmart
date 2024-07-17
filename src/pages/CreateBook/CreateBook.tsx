import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Layout, notification } from 'antd';

import BookForm from '@components/book/BookForm/BookForm';
import type { Book } from '@/types/book';
import AppHeader from '@components/common/Header/Header';
import styles from '@pages/CreateBook/CreateBook.module.scss';

const { Content } = Layout;

type CreateBookProps = {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
};

const CreateBook: React.FC<CreateBookProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const [localBooks, setLocalBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('localBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const handleFormSubmit = (book: Book) => {
    console.log('book--');
    console.log(book);
    const updatedBooks = [...localBooks, book];
    setLocalBooks(updatedBooks);
    localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
    notification.success({
      message: `Success`,
      description: 'Book added to collection.',
    });
    navigate('/');
  };

  return (
    <Content className={styles.createBookPage}>
      <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
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
