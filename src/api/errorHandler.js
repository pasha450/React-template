// validationErrors.js

import { toast } from "react-toastify";

export const validationErrors = (error, setFieldError, setServerErrors) => {
  if (error?.errors && error.errors.length > 0) {
    error.errors.forEach((err) => {
      setFieldError(err.path, err.msg); // Show field-specific errors
    });
    setServerErrors(error.errors);
  } else {
    toast.error('Something went wrong. Please try again later.');
  }
};


