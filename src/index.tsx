import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import 'antd/dist/reset.css';

declare global {
  interface Window {
    process: {
      env: {
        NODE_ENV: string;
        PUBLIC_URL?: string;
      };
    };
  }
}

if (typeof window.process === 'undefined') {
  (window as unknown as Window).process = {
    env: {
      NODE_ENV: 'development',
      PUBLIC_URL: '',
    },
  };
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement,
);
