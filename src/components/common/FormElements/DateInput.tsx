import React from 'react';
import { Input } from 'antd';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type DateInputProps = {
  id: string;
  placeholder: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

const DateInput: React.FC<DateInputProps> = ({
  id,
  placeholder,
  error,
  register,
}) => {
  return (
    <div className="form-item">
      <Input
        type="date"
        className="ant-input ant-input-outlined"
        id={id}
        placeholder={placeholder}
        {...register}
      />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
};

export default DateInput;
