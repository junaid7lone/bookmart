import React, { useState } from 'react';
import { Drawer, Image, Button, Modal } from 'antd';

import Placeholder from '@assets/placeholder.png';
import './BookDetails.scss';
import type { Book } from '@types/book';
import PdfReader from '../../PdfReader/PdfReader';

type BookDetailsProps = {
  book: Book | null;
  visible: boolean;
  onClose: () => void;
};

const BookDetails: React.FC<BookDetailsProps> = ({
  book,
  visible,
  onClose,
}) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  if (!book) return null;

  const handleReadClick = () => {
    setIsModelOpen(true);
  };

  return (
    <>
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
            <strong>Publication Date:</strong>
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
      <Modal
        open={isModelOpen}
        title={book.title}
        style={{ top: 20 }}
        onCancel={() => setIsModelOpen(false)}
        footer={[]}
        width={'80vw'}
        height={'80vh'}
        destroyOnClose
      >
        <PdfReader />
      </Modal>
    </>
  );
};

export default BookDetails;
