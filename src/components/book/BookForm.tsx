import React, { useEffect, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from 'antd';

import { FormInputs } from '@types/formInput';
import './BookForm.scss';

interface BookFormProps {
  onSubmit: (book: FormInputs) => void;
  initialData?: FormInputs;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: initialData || {
      title: '',
      author: '',
      cover: '',
      publicationDate: '',
      description: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        publicationDate: initialData.publicationDate
          ? new Date(initialData.publicationDate).toISOString().split('T')[0]
          : '',
      });
    }
  }, [initialData, reset]);

  const onSubmitHandler: SubmitHandler<FormInputs> = useCallback(
    (data) => {
      const newBook = {
        ...initialData,
        ...data,
        publicationDate: data.publicationDate
          ? new Date(data.publicationDate).toISOString()
          : '',
        id: initialData?.id || `local-${Date.now()}`,
      };

      onSubmit(newBook);
      reset();
    },
    [onSubmit, reset, initialData]
  );

  const inputClass = 'ant-input ant-input-outlined';

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="book-form">
      <div className="form-item">
        <input
          className={inputClass}
          id="title"
          placeholder="Title"
          {...register('title', {
            required: 'Title is required',
            maxLength: {
              value: 100,
              message: 'Title must be less than 100 characters',
            },
          })}
        />
        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}
      </div>
      <div className="form-item">
        <input
          className={inputClass}
          placeholder="Author"
          id="author"
          {...register('author', {
            required: 'Author is required',
            maxLength: {
              value: 50,
              message: 'Author must be less than 50 characters',
            },
          })}
        />
        {errors.author && (
          <span className="error-message">{errors.author.message}</span>
        )}
      </div>
      <div className="form-item">
        <input
          type="url"
          className={inputClass}
          placeholder="Cover URL"
          id="cover"
          {...register('cover', { required: 'Cover URL is required' })}
        />
        {errors.cover && (
          <span className="error-message">{errors.cover.message}</span>
        )}
      </div>
      <div className="form-item">
        <input
          className={inputClass}
          type="date"
          placeholder="Publication Date"
          id="publicationDate"
          {...register('publicationDate', {
            required: 'Publication Date is required',
          })}
        />
        {errors.publicationDate && (
          <span className="error-message">
            {errors.publicationDate.message}
          </span>
        )}
      </div>
      <div className="form-item">
        <textarea
          className={inputClass}
          placeholder="Description"
          id="description"
          {...register('description', {
            maxLength: {
              value: 500,
              message: 'Description must be less than 500 characters',
            },
          })}
        />
        {errors.description && (
          <span className="error-message">{errors.description.message}</span>
        )}
      </div>

      <Button htmlType="submit" type="primary">
        {initialData ? 'Update Book' : 'Add Book'}
      </Button>
    </form>
  );
};

export default BookForm;
