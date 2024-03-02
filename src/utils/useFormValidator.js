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
    if (name === 'email') {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      setErrors({...errors, [name]: isEmailValid ? '' : 'Введите корректный email адрес'});
    } else {
      setErrors({...errors, [name]: event.target.validationMessage});
    }
    setIsValid(event.target.closest('form').checkValidity());
  };

  const setCurrentUserValues = (currentUser) => {
    setValues({name: currentUser.name, email: currentUser.email});
  };

  return {values, errors, isValid, handleChange, setCurrentUserValues};
}

export default useFormValidator;
