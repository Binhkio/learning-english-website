/* eslint-disable import/no-cycle */
import {
  Button, FormControl, FormHelperText, TextField, Typography,
} from '@mui/material';
import { useState } from 'react';
import validate from '../utils/validate';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [displayErrorForm, setDisplayErrorForm] = useState(false);
  const [isValidated, setIsValidated] = useState(true);

  const handleRegister = async () => {
    const form = {
      email,
      name,
      password,
    };
    if (isValidated) {
      console.log('call api', form);
      if (true) {
        setDisplayErrorForm(true);
      }
    }
  };

  const handleCheckValidate = () => {
    setIsValidated(validate.validateEmail(email));
  };

  return (
    <>
      <Typography variant="h5" gutterBottom textAlign="center">
        Register
      </Typography>
      <FormControl className="form-controll">
        <TextField
          className="custom-textfield"
          type="email"
          size="small"
          label="Email"
          required
          placeholder="abcde123@gmail.com"
          onBlur={handleCheckValidate}
          error={!isValidated}
          helperText={!isValidated ? 'Invalid email' : ''}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="custom-textfield"
          type="text"
          size="small"
          label="Name"
          required
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="custom-textfield"
          type="password"
          size="small"
          label="Password"
          required
          placeholder=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={!isValidated} variant="outlined" onClick={handleRegister}>
          Sign up
        </Button>
        {displayErrorForm && (
          <FormHelperText error={displayErrorForm} margin="dense">
            adsad
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
}

export default Register;
