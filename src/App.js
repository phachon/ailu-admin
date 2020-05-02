import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import './assets/styles/index.css';

function App () {
  return (
    <Router>
      <Switch>
        <Route path="/" component={DefaultLayout} />
      </Switch>
    </Router>
  );
}

export default App;
