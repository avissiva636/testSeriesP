import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"

import { Provider } from 'react-redux';
import { store } from 'state/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
