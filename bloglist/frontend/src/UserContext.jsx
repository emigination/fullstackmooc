import { createContext, useContext, useReducer } from 'react';

const userReducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.payload;
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => useContext(UserContext)[0];
