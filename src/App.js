import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Index from './views/Index'
import Login from './views/Login'
import NoMatch from './views/NoMatch'

import './assets/css/app.css';
import './assets/css/reset.css';
import 'rc-easyui/dist/themes/default/easyui.css';
import 'rc-easyui/dist/themes/icon.css';
import 'rc-easyui/dist/themes/react.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Index} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
