import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// For acivating css in bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ContextsProvider from './contexts/ContextsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextsProvider>
          <App />
      </ContextsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
