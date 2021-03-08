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
import Classroom from "./Classroom/insideClassroom";
import Module from "./Classroom/Module/module";
import Assignment from "./Classroom/Assignment/assignment";
import Score from "./Score/score";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import qoreContext from "../qoreContext";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(","),
  },
  button: {
    fontFamily: ["Rubik", "sans-serif"].join(","),
  },
});

export default function index() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <qoreContext.context.Provider
          value={{
            client: qoreContext.client,
          }}
        >
          <Router>
            <Switch>
              <Route exact path="/login" component={BeforeEnterContainer} />
              <Route path="/register" component={Register} />
              <Route path="/registerTeacher" component={RegisterTeacher} />
              <Route path="/registerStudent" component={RegisterStudent} />
              <Route component={DefaultContainer} />
            </Switch>
          </Router>
        </qoreContext.context.Provider>
      </Provider>
    </ThemeProvider>
  );
}

function BeforeEnterContainer() {
  return (
    <>
      <Route path="/login" component={Login} />
    </>
  );
}

function DefaultContainer() {
  return (
    <>
      {/* <Navbar /> */}
      <PrivateRoute path="/" exact>
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute path="/profile">
        <ProfilePage />
      </PrivateRoute>
      <PrivateRoute path="/classroom/:someClassroomId">
        <Classroom />
      </PrivateRoute>
      <PrivateRoute path="/subject/:subjectId">
        <Module />
      </PrivateRoute>
      <PrivateRoute path="/assignment/:assignmentId">
        <Assignment />
      </PrivateRoute>
      <PrivateRoute path="/score">
        <Score />
      </PrivateRoute>
    </>
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
