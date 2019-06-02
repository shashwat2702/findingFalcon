import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import App from '../components/HomePage/App';
// eslint-disable-next-line import/no-named-as-default
import PageLayout from '../containers/PageLayout/PageLayout';

const Router = () => (
  <Switch>
    <Route path="/" component={() => (<PageLayout component={App} />)} />
  </Switch>
);

export default withRouter(Router);
