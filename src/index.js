import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './context/UserContext';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

ReactDOM.render(
  <UserProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserProvider>,
  document.getElementById('root')
);
