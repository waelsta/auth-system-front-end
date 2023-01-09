import React from 'react';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
