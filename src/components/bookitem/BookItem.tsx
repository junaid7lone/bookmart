import React, { useState, useEffect } from 'react';
import { Book } from '../../types/book';
import { Card, Button, Image, Tooltip } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import './BookItem.scss';
import Placeholder from '../../assets/placeholder.png';

const { Meta } = Card;

interface BookItemProps {
  book: Book;
  onEdit?: () => void;
  onDelete?: () => void;
  onView: () => void;
}

const BookItem: React.FC<BookItemProps> = ({
  book,
  onEdit,
  onDelete,
  onView,
}) => {
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

  const actions = [
    <Tooltip title="Add to Favorites">
      <Button
        shape="circle"
        icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
        onClick={toggleFavorite}
      />
    </Tooltip>,
    <Tooltip title="View Details">
      <Button shape="circle" icon={<EyeOutlined />} onClick={onView} />,
    </Tooltip>,
    <Button shape="circle" icon={<MessageOutlined />} />,
  ];

  if (onEdit) {
    actions.push(
      <Tooltip title="Edit Book">
        <Button shape="circle" icon={<EditOutlined />} onClick={onEdit} />
      </Tooltip>
    );
  }
  if (onDelete) {
    actions.push(
      <Tooltip title="Delete Book">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={onDelete} />
      </Tooltip>
    );
  }

  return (
    <article className="grid-item">
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
        actions={actions}
      >
        <Meta
          title={<span className="book-title">{book.title}</span>}
          description={
            <div className="book-author">
              {book.author}{' '}
              {book?.publicationDate && (
                <div className="date">
                  {new Date(book.publicationDate).toDateString()}
                </div>
              )}
            </div>
          }
        />
      </Card>
    </article>
  );
};

export default BookItem;
