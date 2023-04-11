/**
 * Anh sẽ ví dụ về file Register của em
 * Ở đây anh Có dùng thêm callback với memo vì các giá trị của email, name, password thay đổi rất nhiều, mà rule của react không cho như zậy í
 * Nếu em để ý component con FormComponent sẽ có hàm handleChangeInputValue sẽ chạy khi ngươi dùng gõ phím => data có sự render nhiều lần
 * Có thể em chỉ cần dùng context để pass hàm, gọi từ hàm con => cha nhưng mà lúc đó data sẽ thay đổi nhiều lần => memo giải quyết vấn đề này
 * ngoài ra, anh dùng thêm use callback để tránh việc rerender nhiều lần :))))
 *
 */
/* eslint-disable import/no-cycle */
import { Typography } from '@mui/material';
import {
  createContext, useCallback, useMemo, useState,
} from 'react';
import FormComponent from '../components/Form/FormRegisterComponent';

export const RegisterContext = createContext({});

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSetRegisterValue = useCallback((email, name, password) => {
    setEmail(email);
    setName(name);
    setPassword(password);
  }, []);

  const contextValueInit = useMemo(
    () => (
      {
        email, name, password, handleSetRegisterValue,
      }),
    [email, name, password, handleSetRegisterValue],
  );

  return (
    <RegisterContext.Provider value={contextValueInit}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Register
      </Typography>
      <FormComponent handleSetRegisterValue={handleSetRegisterValue} />
    </RegisterContext.Provider>

  );
}

export default Register;
