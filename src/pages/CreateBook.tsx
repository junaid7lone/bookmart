import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types/book';
import { Layout } from 'antd';
import './CreateBook.scss';
import BookForm from '../components/book/BookForm';

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
    navigate('/');
  };

  return (
    <section className="create-book-page">
      <h2>Add New Book</h2>
      <BookForm onSubmit={handleFormSubmit} />
    </section>
  );
};

export default CreateBook;
