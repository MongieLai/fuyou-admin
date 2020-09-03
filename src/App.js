import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Index from './views/Index'
import Login from './views/Login'
import NoMatch from './views/NoMatch'
import logo from './logo.svg';

import './assets/css/app.css';
import './assets/css/reset.css';
import 'rc-easyui/dist/themes/default/easyui.css';
import 'rc-easyui/dist/themes/icon.css';
import 'rc-easyui/dist/themes/react.css';
import routes from './router/index'
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
function App() {
  return (
    <Router>
      <Switch>
        {/* {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))} */}
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Index} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}



export default App;
