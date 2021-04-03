import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Checkout from "./components/Checkout/Checkout";
import Deals from "./components/Deals/Deals";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Order from "./components/Order/Order";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Signup from "./components/Signup/Signup";
export const Context = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState([])
  return (
    <Context.Provider value={[loggedIn, setLoggedIn]}>
      
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/orders">
            <Order />
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <Route path="/deals">
             <Deals/>
          </Route>
          <Route path="/login">
             <Login/>
          </Route>
          <PrivateRoute path="/checkout/:id">
            <Checkout/>
          </PrivateRoute>
          <Route path="/signup">
            <Signup/>
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
