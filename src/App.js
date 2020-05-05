import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import LoginLayout from './layouts/LoginLayout';
import './assets/styles/index.css';

function App () {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginLayout} />
        <Route path="/" component={AdminLayout} />
      </Switch>
    </Router>
  );
}

export default App;
