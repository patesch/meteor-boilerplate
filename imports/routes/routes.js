import React from 'react';
import { Switch, Redirect, Router, Route } from 'react-router'; // customize by Pedro to adjust to the version Meteor 1.6
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Login from './../ui/Login.js'; // Signin
import Dashboard from './../ui/Dashboard.js';
import Signup from './../ui/Signup.js';
import NotFound from './../ui/NotFound.js';

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory; // Por causa dos componentes

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard'];
let isAuthenticated = false;

export const onAuthChange = (isAuth) => {
  isAuthenticated = isAuth;
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuth) // if on unauthenticated page and logged in, redirect to '/dashboard'
    browserHistory.push('/dashboard');
  else if (isAuthenticatedPage && !isAuth) // if on authenticated page and not logged in, redirect to '/'
    browserHistory.push('/');
};

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  </Router>
);
