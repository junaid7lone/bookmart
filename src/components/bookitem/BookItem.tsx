import React, { useState, useEffect } from 'react';
import { Book } from '../../types/book';
import { Card, Button, Image } from 'antd';
import { HeartOutlined, HeartFilled, MessageOutlined } from '@ant-design/icons';
import './Bookitem.scss';
import Placeholder from '../../assets/placeholder.png';

const { Meta } = Card;

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    if (savedFavorites.some((favBook: Book) => favBook.id === book.id)) {
      setIsFavorite(true);
    }
  }, [book.id]);

  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = savedFavorites.filter(
        (favBook: Book) => favBook.id !== book.id
      );
      setIsFavorite(false);
    } else {
      updatedFavorites = [...savedFavorites, book];
      setIsFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Card
      className="book-item"
      cover={
        <div className="book-cover-wrapper">
          <Image
            className="book-image"
            src={book.cover}
            alt={book.title}
            preview={false}
            fallback={Placeholder}
          />
        </div>
      }
      actions={[
        <Button
          shape="circle"
          icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
          onClick={toggleFavorite}
        />,
        <Button shape="circle" icon={<MessageOutlined />} />,
      ]}
    >
      <Meta
        title={<span className="book-title">{book.title}</span>}
        description={<span className="book-author">{book.author}</span>}
      />
    </Card>
  );
};

export default BookItem;
