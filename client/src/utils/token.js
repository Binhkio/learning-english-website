// for store and get token
const setSessionStorage = ({token, expiresIn}) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('expirationDate', expirationDate);
};

const getSessionStorage = () => {

  const token = sessionStorage.getItem('token');
  const expirationDate = sessionStorage.getItem('expirationDate');
  if (!token || !expirationDate) {
    return null;
  }
  if (new Date() > new Date(expirationDate)) {
    removeSessionStorage()
    return null;
  }
  return {
    token,
    expirationDate,
  };
};

const removeSessionStorage = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('expirationDate');
}

const token = {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage
};

export default token;
