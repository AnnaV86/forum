import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './components/App/App';
import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
