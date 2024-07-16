import React from 'react';
import type { Book } from '@types/book';
import { Card, Button, Image, Tooltip } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import './BookItem.scss';
import Placeholder from '@assets/placeholder.png';

const { Meta } = Card;

type BookItemProps = {
  book: Book;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
};

const BookItem: React.FC<BookItemProps> = ({
  book,
  onView,
  onEdit,
  onDelete,
  isFavorite,
  toggleFavorite,
}) => {
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
            <div
              className=" cursor-pointer flex justify-between "
              onClick={onView}
            >
              <div className="book-author">{book.author}</div>
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