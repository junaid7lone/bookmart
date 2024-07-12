import React from 'react';
import { Drawer, Image, Button } from 'antd';

import { Book } from '@types/book';
import Placeholder from '@assets/placeholder.png';
import './BookDetails.scss';
import config from '@config';

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

  const handleReadClick = () => {
    window.open(config.pdfUrl, '_blank');
  };

  return (
    <Drawer
      title={book.title}
      placement="right"
      width={400}
      onClose={onClose}
      open={visible}
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
        <Button type="primary" onClick={handleReadClick}>
          Read
        </Button>
      </div>
    </Drawer>
  );
};

export default BookDetails;
