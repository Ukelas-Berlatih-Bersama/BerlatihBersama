import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import redux
import { Provider } from "react-redux";
import store from "../store";

// import pages
import Login from "./Login/loginPage";
import Register from "./Register/registerPage";
import Dashboard from "./Dashboard/dashboard";
import RegisterTeacher from "./Register/registerTeacher";
import RegisterStudent from "./Register/registerStudent";
import ProfilePage from "./ProfileUser/profile";
import AddNewClass from "./Dashboard/addNewClass";
import Classroom from "./Classroom/insideClassroom";
import Module from "./Classroom/Module/module";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

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
              <Route exact path="/login" component={BeforeEnterContainer} />
              <Route path="/register" component={Register} />
              <Route path="/registerTeacher" component={RegisterTeacher} />
              <Route path="/registerStudent" component={RegisterStudent} />
              <Route component={DefaultContainer} />
            </Switch>
          </div>
        </Router>
      </qoreContext.context.Provider>
    </Provider>
  );
}

function BeforeEnterContainer() {
  return (
    <div>
      <Route path="/login" component={Login} />
    </div>
  );
}

function DefaultContainer() {
  return (
    <div>
      {/* <Navbar /> */}
      <PrivateRoute path="/" exact>
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute path="/profile">
        <ProfilePage />
      </PrivateRoute>
      <PrivateRoute path="/add_class">
        <AddNewClass />
      </PrivateRoute>
      <PrivateRoute path="/classroom/:someClassroomId">
        <Classroom />
      </PrivateRoute>
      <PrivateRoute path="/subject/:subjectId">
        <Module />
      </PrivateRoute>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  useSelector((state) => state.isLogin);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
