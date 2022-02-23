import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/services/firebase.ts';
import './styles/global.scss';



ReactDOM.render(
  <React.StrictMode>
    <button></button>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
