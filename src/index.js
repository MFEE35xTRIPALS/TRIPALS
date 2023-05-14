import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './components/CSS/Header.scss'
import './components/CSS/Footer.scss';
import './pages/Home/css/Home.scss';
import './components/CSS/Bear.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

