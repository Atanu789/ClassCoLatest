import React from 'react';
import ReactDOM from 'react-dom/client';
 // Import BrowserRouter
import App from './App.jsx';
import './index.css';
import { StudentIdProvider } from './context/StudentIdContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StudentIdProvider>
      <App />
    </StudentIdProvider>
    
  </React.StrictMode>
);
