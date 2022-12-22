import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import CustomTypography from 'components/CustomTypography';
import { Error } from './TextFieldInput.styles';

interface ITextFieldOwnProps {
  name: string;
  register: (name: string) => void;
  type: string;
  error?: string;
}

type ITextFieldProps = TextFieldProps & ITextFieldOwnProps;

const TextFieldInput = ({
  label,
  name,
  register,
  type,
  error,
  ...rest
}: ITextFieldProps) => (
  <>
    {label && (
      <CustomTypography
        variant='body2'
        fontWeightKey='bold'
        color='textSecondary'
        gutterBottom
      >
        {label}
      </CustomTypography>
    )}
    <TextField
      type={type}
      {...register(name)}
      id={name}
      error={error}
      fullWidth
      {...rest}
    />
    {error && (
      <ErrorMessage
        name={name}
        render={({ message }) => <Error>{message}</Error>}
      />
    )}
  </>
);

export default TextFieldInput;
