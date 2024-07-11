import React from 'react';
import { Book } from '../../types/book';
import { Drawer, Image, Button } from 'antd';
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

  const handleReadClick = () => {
    const pdfUrl =
      'https://drive.google.com/file/d/1oCgcUISodAxjb1Tckc5PDISSyY-d8Mri/view';
    window.open(pdfUrl, '_blank');
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
