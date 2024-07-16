import React from 'react';
import { Input } from 'antd';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type TextInputProps = {
  id: string;
  placeholder: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  placeholder,
  error,
  register,
}) => {
  return (
    <div className="form-item">
      <Input
        className="ant-input ant-input-outlined"
        id={id}
        placeholder={placeholder}
        {...register}
      />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
};

export default TextInput;
