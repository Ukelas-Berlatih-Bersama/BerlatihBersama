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
  Button,
  Box,
} from "@material-ui/core";
import Sidebar from "../../components/sidebar";
import Classroom from "../../components/cardClass";
import qoreContext from "../../qoreContext";
import Navbar from "../../components/Navbar";

const drawerWidth = 200;

const useStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  margin: {
    margin: theme.spacing(1),
  }
}));

function Dashboard() {
  const classes = useStyle();

  const { data: classroom, status } = qoreContext
    .view("allClassroom")
    .useListRow();

  console.log(status, "<<<status");
  console.log(classroom, "<<<classroom");

  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" style={{padding: "0 1em", margin: "5em auto"}}>
          <Box>
            <Typography variant="h4">Semua Kelas</Typography>
            <Typography>Pilih dan kelola kelas Anda dengan mudah</Typography>
          </Box>
          <Box>
            <Button variant="contained" color="primary" className={classes.margin}>Tambah Kelas</Button>
            <Button variant="outlined" color="primary" className={classes.margin}>Gabung Kelas</Button>
          </Box>
        </Box>
      </Container>
      <Container maxWidth="lg">
        <main style={{ flexGrow: 2, padding: 30 }}>
          <div className={classes.toolbar}>
            <Grid container spacing={2}>
              {classroom.map((room, i) => {
                return (
                  <Grid item xs={4} key={i}>
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
