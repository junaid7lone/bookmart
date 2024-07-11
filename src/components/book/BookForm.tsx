import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Book } from '../../types/book';
import { Button, Input, Form } from 'antd';
import './BookForm.scss';

interface BookFormProps {
  onSubmit: (book: Book) => void;
  initialData?: Book;
}

interface FormInputs {
  title: string;
  author: string;
  cover: string;
  publicationDate: string;
  description: string;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: initialData || {
      title: '',
      author: '',
      cover: '',
      publicationDate: '',
      description: '',
    },
  });

  const onSubmitHandler: SubmitHandler<FormInputs> = (data) => {
    const newBook = {
      ...initialData,
      ...data,
      id: initialData?.id || Date.now(),
    };
    onSubmit(newBook);
    reset();
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmitHandler)}
      className="book-form"
    >
      <Form.Item label="Title">
        <Input {...register('title', { required: true })} />
      </Form.Item>
      <Form.Item label="Author">
        <Input {...register('author', { required: true })} />
      </Form.Item>
      <Form.Item label="Cover Image URL">
        <Input {...register('cover')} />
      </Form.Item>
      <Form.Item label="Publication Date">
        <Input type="date" {...register('publicationDate')} />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea {...register('description')} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialData ? 'Update Book' : 'Add Book'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookForm;
