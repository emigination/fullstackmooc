import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload;
  case 'REMOVE':
    return state === action.payload ? null : state;
  default:
    return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationDispatch = () => {
  return useContext(NotificationContext)[1];
};

export const useNotificationValue = () => {
  return useContext(NotificationContext)[0];
};
