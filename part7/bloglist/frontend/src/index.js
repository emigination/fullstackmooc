import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={new QueryClient()}>
    <NotificationContextProvider>
      <UserContextProvider>
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
