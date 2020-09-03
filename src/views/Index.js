import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Layout, LayoutPanel } from 'rc-easyui';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import User from '../components/system/User'

import routes from '../router/index'
console.log(routes)
export class Home extends Component {
    render() {
        return (
            <div>

                <Layout style={{ width: '100vw', height: '100vh' }}>
                    <LayoutPanel region="north" style={{ height: '8vh' }}>
                        <Header />
                    </LayoutPanel>

                    <LayoutPanel border={false} region="west" style={{ width: 200 }}>
                        <Sidebar />
                    </LayoutPanel>

                    <LayoutPanel border={false} region="center" style={{ background: `#f6f8fd`, height: '100%', padding: '10px' }}>
                        {/* {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))} */}
                        {/* <Route path='*'>
                            <div>12312</div>
                        </Route> */}
                        <Router>
                            <Route exact path="/system/yhgl" component={User} />
                        </Router>
                        {/* <Home /> */}
                    </LayoutPanel>
                </Layout>
            </div>
        )
    }
}


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

export default Home
