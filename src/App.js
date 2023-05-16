import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import ViewArticle from "./components/ViewArticle/ViewArticle";

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route path="/ViewArticle/:userno/:articleno" render={(props) => <ViewArticle userno={props.match.params.userno} articleno={props.match.params.articleno} />} />
    </Switch>
  </BrowserRouter>   
  );
  }
export default App;