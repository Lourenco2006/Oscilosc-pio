// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Estilos (se houver)
import App from './App'; // O componente principal

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Aqui o React irá renderizar o App
);
