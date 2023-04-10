import { Button, FormControl, FormHelperText } from '@mui/material';
import InputComponent from '../Input/InputComponent';
import '../../access/style.scss';
import React, { createContext, useRef, useContext, useState } from 'react';
import { LoginContext } from '../../pages/Login';

export const FormContext = createContext();

const FormComponent = () => {
  const { handleSetLoginValue } = useContext(LoginContext);

  const refEmail = useRef();
  const refPassword = useRef();

  const [isValidateElement, setIsValidateElement] = useState(true);
  const [displayErrorForm, setDisplayErrorForm] = useState(true)

  const handleLogin = (event) => {
    event.preventDefault();
    handleSetLoginValue(refEmail.current.value, refPassword.current.value);
    setDisplayErrorForm(!isValidateElement)
  };

  const handleValidForm = (isValidated) => {
    setIsValidateElement(isValidated);
  };

  return (
    <FormContext.Provider value={{ handleValidForm }}>
      <FormControl onClick={handleLogin}>
        <InputComponent
          type="email"
          label="Email"
          required={true}
          placeholder="abcde123@gmail.com"
          ref={refEmail}
          displayErrorForm={displayErrorForm}
        />
        <InputComponent
          type="password"
          label="Password"
          required={true}
          placeholder=""
          ref={refPassword}
        />
        <Button
          variant="outlined"
          onClick={handleLogin}>
          Sign in
        </Button>
        {!displayErrorForm && (
          <FormHelperText
            error={!displayErrorForm}
            margin="dense">
            adsad
          </FormHelperText>
        )}
      </FormControl>
    </FormContext.Provider>
  );
};

export default FormComponent;
