import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import qoreContext from "../qoreContext";
import { logout } from "../store/actions/actionUser";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.blue,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // const username = useSelector((state) => state.reducerLogin.user);

  // const { data: classroom, status } = qoreContext
  //   .view("classroom")
  //   .useListRow({});

  function handleLogout() {
    dispatch(logout());
    history.push("/");
  }

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <Link to="/">
            <ListItem button>Home</ListItem>
          </Link>
          <Link to="/add_class">
            <ListItem button>Add New Class</ListItem>
          </Link>
          <Link to="/profile">
            <ListItem button>Profile</ListItem>
          </Link>
          <ListItem onClick={handleLogout} button>
            Logout
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
