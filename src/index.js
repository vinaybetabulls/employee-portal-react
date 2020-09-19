/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import Login from "views/user-onboarding/Login";
import { AppProvider } from './context/AppContext';
import jwtDecode from 'jwt-decode';

const hist = createBrowserHistory();
let isAuthenticated = true;

(function () {
  let token = localStorage.getItem('empJWT');
  if (token) {
    var decoded = jwtDecode(token);
    const now = Date.now().valueOf() / 1000
    if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
      console.log(`token expired`)
      isAuthenticated = false;
      return false;
    }
  } else if (!token) {
    isAuthenticated = false;
    return false;
  }
}());


ReactDOM.render(
  <AppProvider>
    <Router history={hist}>
      <Switch>
        {
          !isAuthenticated ? <>
            <Redirect from="/*" to="/" />
            <Route path="/" component={Login} />
          </> : <Route path="/" component={Admin} />
        }
      </Switch>
    </Router>
  </AppProvider>,
  document.getElementById("root")
);
