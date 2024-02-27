import {useState} from 'react';

function useFormValidator() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
    setErrors({...errors, [event.target.name]: event.target.validationMessage});
    setIsValid(event.target.closest('form').checkValidity());
  };

  const setCurrentUserValues = (currentUser) => {
    setValues({name: currentUser.name, email: currentUser.email});
  };

  return {values, errors, isValid, handleChange, setCurrentUserValues};
}

export default useFormValidator;
