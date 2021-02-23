import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  List,
  Typography,
  Grid,
} from "@material-ui/core";
import Sidebar from "../../components/sidebar";
import Classroom from "../../components/cardClass";
import qoreContext from "../../qoreContext";
import Navbar from "../../components/Navbar";

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
      <Navbar />
      {/* <Sidebar></Sidebar> */}
      <Container maxWidth="lg">
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
      </Container>
    </div>
  );
}

export default Dashboard;
