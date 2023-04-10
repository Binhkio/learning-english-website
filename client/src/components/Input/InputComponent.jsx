import { TextField } from '@mui/material';
import { forwardRef, useState } from 'react';
import validate from '../../utils/validate';
import './style.scss'
import { useContext } from 'react';
import { FormContext } from '../Form/FormComponent'

const InputCustom = ({ type, label, required, placeholder, displayErrorForm}, ref) => {
  const { handleValidForm } = useContext(FormContext)

  const [isValidated, setIsValidated] = useState(true);

  const handleChange = () => {
    if (isValidated !== validate.validateEmail(ref.current.value)) setIsValidated(!isValidated);
    // props.onData(isValidated)
    handleValidForm(isValidated)
  };

  const errorNoti = (type) => {
    switch (type) {
      case 'email':
          return 'Invalid email'
        default:
          return 'Something'
    }
  }

  return (
    <TextField
      className='custom-textfield'
      type={type}
      size="small"
      label={label}
      variant="outlined"
      required={required}
      placeholder={placeholder !== '' ? placeholder : 'Please enter valid value'}
      inputRef={ref}
      onChange={() => handleChange()}
      error={ (!isValidated || !displayErrorForm )&& type === 'email'}
      helperText={ (!isValidated || !displayErrorForm ) && type === 'email' ? errorNoti(type) : ''} >
    </TextField>
  );
};

export default forwardRef(InputCustom);
