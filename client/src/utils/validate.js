const validateEmail = (value) => {
  if (typeof value !== 'string') return !value;

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(value);
};

const validate = {
  validateEmail,
};

export default validate;
