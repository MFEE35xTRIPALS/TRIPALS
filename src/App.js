import React, { Component } from 'react';
// import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import ViewArticle from "./components/ViewArticle/ViewArticle";

class App extends Component {
  state = {  } 
  render() { 
    return (
      <ViewArticle/>
    );
  }
}

export default App;