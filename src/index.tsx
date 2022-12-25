import './index.css';
import App from './App';
import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>
);
