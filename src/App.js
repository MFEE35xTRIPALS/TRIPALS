import React, { Component } from 'react';
import Header from './components/Header.jsx';
import BearLogo from './components/BearLogo.jsx';
import Home from './pages/Home/Home.jsx'
import Footer from './components/Footer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <Header />
      <BearLogo />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
