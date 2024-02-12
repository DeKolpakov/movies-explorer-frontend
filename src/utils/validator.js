import SimpleReactValidator from 'simple-react-validator';

const customErrorMessages = {
  default: 'Что-то пошло не так...',
  required: 'Поле :attribute обязательно',
  email: 'Введите корректный адрес электронной почты',
  min: `Поле :attribute должно содержать минимум :min символа.`,
  max: `Поле :attribute должно содержать максимум :max символов.`,
};

const validator = new SimpleReactValidator({
  messages: customErrorMessages,
});

export default validator;