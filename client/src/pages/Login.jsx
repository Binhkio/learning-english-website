/* eslint-disable import/no-cycle */
import { Typography } from '@mui/material';
import React, {
  createContext, useCallback, useMemo, useState,
} from 'react';
import FormComponent from '../components/Form/FormLoginComponent';

export const LoginContext = createContext({});

function LoginPageComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSetLoginValue = useCallback((email, password) => {
    setEmail(email);
    setPassword(password);
  }, []);

  const contextValueInit = useMemo(() => (
    { email, password, handleSetLoginValue }), [email, password, handleSetLoginValue]);

  return (
    <LoginContext.Provider value={contextValueInit}>
      <Typography variant="h5" gutterBottom textAlign="center">
        LOGIN
      </Typography>
      <FormComponent handleSetLoginValue={handleSetLoginValue} />
    </LoginContext.Provider>
  );
}

export default LoginPageComponent;
