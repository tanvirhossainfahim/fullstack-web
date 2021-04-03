import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Context } from "../App";

function PrivateRoute({ children, ...rest }) {
  const [loggedIn, setLoggedIn] = useContext(Context);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn.email ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
