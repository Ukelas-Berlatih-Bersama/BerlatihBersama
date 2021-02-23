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
import EditProfile from "./ProfileUser/editProfile";
import Classroom from "./Classroom/insideClassroom";
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
  }
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
    </ThemeProvider>
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
      <PrivateRoute path="/" exact>
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute path="/profile">
        <ProfilePage />
      </PrivateRoute>
      <PrivateRoute path="/edit_profile">
        <EditProfile />
      </PrivateRoute>
      <PrivateRoute path="/add_class">
        <AddNewClass />
      </PrivateRoute>
      <PrivateRoute path="/classroom/:id">
        <Classroom />
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
