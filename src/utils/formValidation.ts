import { Rule } from 'antd/es/form';

export const VALIDATION_MESSAGES = {
  required: '${label} is required',
  minLength: '${label} must be at least ${min} characters',
  maxLength: '${label} cannot exceed ${max} characters',
  email: '${label} is not a valid email',
  url: '${label} is not a valid URL',
  number: '${label} must be a number',
  min: '${label} must be at least ${min}',
  max: '${label} cannot exceed ${max}',
};

export const createRequiredRule = (message?: string): Rule => ({
  required: true,
  message: message || VALIDATION_MESSAGES.required,
});

export const createLengthRule = (min: number, max: number): Rule => ({
  min,
  max,
  message: `Must be between ${min} and ${max} characters`,
});

export const createMinLengthRule = (min: number): Rule => ({
  min,
  message: `Must be at least ${min} characters`,
});

export const createMaxLengthRule = (max: number): Rule => ({
  max,
  message: `Cannot exceed ${max} characters`,
});

export const createPatternRule = (pattern: RegExp, message: string): Rule => ({
  pattern,
  message,
});

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const URL_PATTERN = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
