import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// import redux
import { Provider, useSelector } from "react-redux";
import store from "../store";

// import pages
import Login from "./Login/loginPage";
import Register from "./Register/registerPage";
import Dashboard from "./dashboard";

import qoreContext from "../qoreContext";

export default function index() {
  return (
    <Provider store={store}>
      <qoreContext.context.Provider
        value={{
          client: qoreContext.client,
        }}
      >
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </qoreContext.context.Provider>
    </Provider>
  );
}

// function BeforeEnterContainer() {
//   return (
//     <div>
//       <Route path="/login" component={Login} />
//     </div>
//   );
// }
