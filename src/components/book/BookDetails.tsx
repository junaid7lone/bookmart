import React from 'react';
import { Book } from '../../types/book';
import { Drawer, Image } from 'antd';
import './BookDetails.scss';
import Placeholder from '../../assets/placeholder.png';

interface BookDetailsProps {
  book: Book | null;
  visible: boolean;
  onClose: () => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({
  book,
  visible,
  onClose,
}) => {
  if (!book) return null;

  return (
    <Drawer
      title={book.title}
      placement="right"
      width={400}
      onClose={onClose}
      visible={visible}
    >
      <div className="book-details">
        <Image
          src={book.cover}
          alt={book.title}
          fallback={Placeholder}
          className="book-details-cover"
        />
        <h3>{book.title}</h3>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Publication Date:</strong>{' '}
          {new Date(book.publicationDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Description:</strong> {book.description}
        </p>
      </div>
    </Drawer>
  );
};

export default BookDetails;
