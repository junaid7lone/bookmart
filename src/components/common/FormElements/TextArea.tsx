import React from 'react';
import { Input } from 'antd';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from '@components/book/BookForm/BookForm.module.scss';

const { TextArea } = Input;

type TextAreaProps = {
  id: string;
  placeholder: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

const CustomTextArea: React.FC<TextAreaProps> = ({
  id,
  placeholder,
  error,
  register,
}) => {
  return (
    <div className={styles.formItem}>
      <TextArea
        className={`${styles.fromInput}  ant-input ant-input-outlined`}
        id={id}
        placeholder={placeholder}
        {...register}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};

export default CustomTextArea;
