import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//Herry
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Navigation2 from "./components/Navigation";
import Footer from "./components/Footer";
// YuTing
import Destination from "./components/Destination";
import Login from "./components/Login";
import Register from "./components/Register";
// Tina
import Guides from "./components/Guides";
import Admin from "./components/Admin";
// Xin
import Selfpage from "./components/Selfpage";
import Client from "./components/Client";
// YuKang
import ViewArticle from "./components/ViewArticle";

import Error from "./components/Error";

function App() {
  let [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <div>
        <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route
            path="/guides"
            render={(props) => (
              <Guides
                {...props}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <Route path="/destination" component={Destination} />
          <Route
            path="/selfpage:authorno"
            render={(props) => (
              <Selfpage
                {...props}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <Route path="/view:articleno" component={ViewArticle} />
          <Route
            path="/admin"
            render={(props) => (
              <Admin
                {...props}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <Route
            path="/client"
            render={(props) => (
              <Client
                {...props}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <Route component={Error} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
