// validationErrors.js

import { toast } from "react-toastify";

export const validationErrors = (error, setFieldError, setServerErrors) => {
    if (error.errors && error.errors.length>0 ) {
        error.errors.forEach(err => {
          setFieldError(err.path, err.msg);
        });
       setServerErrors(error.errors);  // update the state for server errors 
       console.log(error.errors,"server errors ")
    }
    else {
    toast.error("An unexpected error occurred. Please try again.");
  }
};


