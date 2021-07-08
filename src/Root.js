import React, { Component } from 'react';
import App from './App';
import Recents from './Recents';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Root extends Component {
    state = {  }
    render() { 
        return (
            <Router>
                <Switch>
                    <Route exact path="/recents">
                        <Recents key="recents" />
                    </Route>
                    <Route path="/">
                        <App key="app" />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
 
export default Root;