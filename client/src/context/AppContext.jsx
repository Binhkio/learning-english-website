import {
  createContext, useContext, useMemo, useState,
} from 'react';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
function AppContextProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Quan',
    email: 'quan@gmail.com',
  });

  const data = useMemo(() => ({
    user,
    setUser,
  }), [user]);

  return (
    <AppContext.Provider value={data}>
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => useContext(AppContext);

export default AppContextProvider;

export { AppContext, useAppContext };
