import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Search from './Search';
import Chapter from './mangainfo';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Mangapage from './mangapage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
