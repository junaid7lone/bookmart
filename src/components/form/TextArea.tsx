import React from 'react';
import { Input } from 'antd';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

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
    <div className="form-item">
      <TextArea
        className="ant-input ant-input-outlined"
        id={id}
        placeholder={placeholder}
        {...register}
      />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
};

export default CustomTextArea;
