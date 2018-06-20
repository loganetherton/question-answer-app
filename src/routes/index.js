import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import NoMatch from '../components/NoMatch'

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes
