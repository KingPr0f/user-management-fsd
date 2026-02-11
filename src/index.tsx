// @ts-ignore
window.process = { env: { NODE_ENV: 'development' } };
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import 'antd/dist/reset.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);