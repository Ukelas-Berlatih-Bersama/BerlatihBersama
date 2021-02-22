import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Grid,
} from "@material-ui/core";
import Sidebar from "../../components/sidebar";
import Classroom from "../../components/cardClass";
import qoreContext from "../../qoreContext";

const drawerWidth = 200;

const useStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function Dashboard() {
  const classes = useStyle();

  const { data: classroom, status } = qoreContext
    .view("allClassroom")
    .useListRow();

  console.log(status, "<<<status");
  console.log(classroom, "<<<classroom");

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar></Sidebar>
      <main style={{ flexGrow: 2, padding: 30 }}>
        <div className={classes.toolbar}>
          <Grid container spacing={2}>
            {classroom.map((room, i) => {
              return (
                <Grid item xs={3} key={i}>
                  <Classroom room={room} key={i} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
