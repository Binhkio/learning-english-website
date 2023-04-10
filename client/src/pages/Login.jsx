import { Typography } from '@mui/material';
import FormComponent from '../components/Form/FormComponent'
import React, { createContext, useState } from 'react';

export const LoginContext = createContext()

const LoginPageComponent = () => {

  // set up state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSetLoginValue = (email, password) => {
    setEmail(email)
    setPassword(password)
  }

  return (
    <LoginContext.Provider value={{ handleSetLoginValue }}>
    <Typography
      variant="h5"
      gutterBottom
      textAlign="center">
      LOGIN
    </Typography>
    <FormComponent />
  </LoginContext.Provider>
  )
};

export default LoginPageComponent;
