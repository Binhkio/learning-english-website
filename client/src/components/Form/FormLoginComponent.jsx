/* eslint-disable import/no-cycle */
import {
  Button, FormControl, FormHelperText, TextField,
} from '@mui/material';
import '../../access/style.scss';
import './style.scss';
import { useContext, useRef, useState } from 'react';
import { LoginContext } from '../../pages/Login';
import validate from '../../utils/validate';

function FormLoginComponent() {
  const { handleSetLoginValue } = useContext(LoginContext);

  const refEmail = useRef();
  const refPassword = useRef();

  const [isValidated, setIsValidated] = useState(true);

  const [isValidateElement] = useState(true);
  const [displayErrorForm, setDisplayErrorForm] = useState(true);

  const handleLogin = (event) => {
    event.preventDefault();
    setDisplayErrorForm(!isValidateElement);
  };

  const handleChangeInputValue = () => {
    const email = refEmail.current.value;
    const password = refPassword.current.value;

    if (isValidated !== validate.validateEmail(email)) setIsValidated(!isValidated);

    handleSetLoginValue(email, password);
  };

  return (
    <FormControl>
      <TextField
        className="custom-textfield"
        type="email"
        size="small"
        label="Email"
        required
        placeholder="abcde123@gmail.com"
        inputRef={refEmail}
        error={!isValidated}
        helperText={!isValidated ? 'Invalid email' : ''}
        onChange={handleChangeInputValue}
      />
      <TextField
        className="custom-textfield"
        type="password"
        label="Password"
        required
        placeholder=""
        inputRef={refPassword}
        onChange={handleChangeInputValue}
      />
      <Button variant="outlined" onClick={handleLogin}>
        Sign in
      </Button>
      {!displayErrorForm && (
        <FormHelperText error={!displayErrorForm} margin="dense">
          adsad
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default FormLoginComponent;
