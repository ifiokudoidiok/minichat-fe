import { object, string, ref } from 'yup';

const requiredMessage = 'This field is required';
const originRequiredMessage = 'Origin is required';
const destinationRequiredMessage = 'Destination is required';
const emailMessage = 'Invalid email';
const usernameMessage = 'Invalid username';
const passwordMatchMessage = 'Passwords must match';
const validateMessage = 'Password is too short - should be 6 chars minimum.';

export const contactInfoForm = object().shape({
  email: string().trim().email(emailMessage).required(requiredMessage),
  dot: string().required(requiredMessage),
  company: string().trim().required(requiredMessage),
  phone: string().trim().required(requiredMessage),
  password: string().trim().min(6, validateMessage).required(requiredMessage),
  passwordConfirm: string().oneOf(
    [ref('password'), null],
    passwordMatchMessage,
  ),
});

export const loginForm = object().shape({
  usename: string().trim().min(1, usernameMessage).required(requiredMessage),
  password: string().trim().min(6, validateMessage).required(requiredMessage),
});


export const recoverPasswordForm = object().shape({
  email: string().trim().email(emailMessage).required(requiredMessage),
});
