import React,{useState,useEffect} from 'react';

function useFormValidator() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  /* useEffect(() => {
    let timer;
    if (Object.values(errors).some((error) => error)) {
      timer = setTimeout(() => {
        setErrors({});
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [errors]); */

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues({...values, [name]: value});
    let updatedErrors;
    if (name === 'email') {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      updatedErrors = {...errors, [name]: isEmailValid ? '' : 'Введите корректный email адрес'};
    } else {
      updatedErrors = {...errors, [name]: event.target.validationMessage};
    }
    setErrors(updatedErrors);
    const formIsValid = Object.values(updatedErrors).every((error) => !error);
    const isFormValid = event.target.closest('form').checkValidity();
    setIsValid(formIsValid && isFormValid);
  };
  
  const setCurrentUserValues = (currentUser) => {
    setValues({name: currentUser.name, email: currentUser.email});
  };
  return {values, errors, isValid, handleChange, setCurrentUserValues};
}

export default useFormValidator;
