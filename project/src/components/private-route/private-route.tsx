import * as React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAuth: boolean;
  children: JSX.Element;
};

function PrivateRoute({ children, isAuth }: PrivateRouteProps): JSX.Element {
  const auth = isAuth;
  return auth ? children : <Navigate to='/login' />;
}

export default PrivateRoute;
