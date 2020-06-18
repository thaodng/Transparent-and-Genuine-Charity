import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authentication: { isAuthenticated } } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={
        props => !isAuthenticated
          ? <Redirect to='/' />
          : <Component {...props} />
      }
    />
  )
};

export default (PrivateRoute);

/*
https: //reactjs.org/docs/higher-order-components.html
 */