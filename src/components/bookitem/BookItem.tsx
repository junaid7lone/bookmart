import React, { useState, useEffect } from 'react';
import { Card, Button, Image, Tooltip, notification } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';

import { Book } from '@types/book';
import Placeholder from '@assets/placeholder.png';
import './BookItem.scss';

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
      notification.info({
        message: `Removed from favorites`,
        placement: 'bottomRight',
      });
    } else {
      updatedFavorites = [...savedFavorites, book];
      setIsFavorite(true);
      notification.info({
        message: `Added to favorites`,
        placement: 'bottomRight',
      });
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const actions = [
    <Tooltip title="Add to Favorites" key="fav-btn">
      <Button
        shape="circle"
        icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
        onClick={toggleFavorite}
      />
    </Tooltip>,
    <Tooltip title="View Details" key="view-btn">
      <Button shape="circle" icon={<EyeOutlined />} onClick={onView} />,
    </Tooltip>,
  ];

  if (onEdit) {
    actions.push(
      <Tooltip title="Edit Book" key="edit-btn">
        <Button shape="circle" icon={<EditOutlined />} onClick={onEdit} />
      </Tooltip>
    );
  }
  if (onDelete) {
    actions.push(
      <Tooltip title="Delete Book" key="delete-btn">
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
              className="book-image cursor-pointer"
              src={book.cover}
              alt={book.title}
              preview={false}
              fallback={Placeholder}
              onClick={onView}
            />
          </div>
        }
        actions={actions}
      >
        <Meta
          title={
            <span className="book-title cursor-pointer" onClick={onView}>
              {book.title}
            </span>
          }
          description={
            <div className="book-author cursor-pointer" onClick={onView}>
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
