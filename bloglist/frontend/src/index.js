import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={new QueryClient()}>
    <NotificationContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
