import React from 'react';
import ReactDOM from 'react-dom/client';
import { NotificationContextProvider } from './NotificationContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>
);
