
import React from "react"
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {

  let isLogged = useSelector(state => state.isLogged); // as in reducers/index

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/logisn",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;