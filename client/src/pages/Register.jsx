import { Button, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import validateEmail from '../utils/validate';
import InputComponent from '../components/Input/InputComponent';
import axios from 'axios';
import '../access/style.scss'

const Register = () => {
  const [formValidate, setFormValidate] = useState(true);

  const refEmail = useRef();
  const refName = useRef();
  const refPassword = useRef();

  const handleRegister = async () => {
    const checkValidate = validateEmail(refEmail.current);

    const email = refEmail.current.value;
    const name = refName.current.value;
    const password = refPassword.current.value;

    if (!checkValidate) {
      setFormValidate(checkValidate);
      return;
    }

    const formData = { email, name, password };
    console.log('Clicked Sign Up button', formData);

    await axios
      .post('???', formData)
      .then((response) => {
        console.log('Success');
      })
      .catch((error) => {
        console.log('error');
      });
  };

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        textAlign="center">
        REGISTER
      </Typography>
      <form>
        <InputComponent
          type="email"
          label="Email"
          required={true}
          placeholder="abcde123@gmail.com"
          ref={refEmail}
        />
        <InputComponent
          type="text"
          label="Name"
          required={true}
          placeholder="Nguyen Van A"
          ref={refName}
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
          onClick={handleRegister}>
          Sign up
        </Button>
      </form>
    </>
  );
};

export default Register;
