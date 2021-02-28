import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button,
  Box,
} from "@material-ui/core";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import Classroom from "../../components/cardClass";
import qoreContext from "../../qoreContext";

import Header from "./Header";

import chalkBoardIllustration from "../../image/class-chalkboard.svg";

const useStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  margin: {
    margin: theme.spacing(1),
  },
}));

function Dashboard() {
  const classes = useStyle();

  const { data: classroom, status } = qoreContext
    .view("allClassroom")
    .useListRow();

  // console.log(status, "<<<status");
  // console.log(classroom, "<<<classroom");


  if (classroom.length <= 0) {
    return (
      <>
        <CssBaseline />
        <Navbar />
        <Header />
        <Container maxWidth="lg" style={{textAlign: 'center'}}>
          <img src={chalkBoardIllustration} style={{marginBottom: 32}} />
          <Typography variant="h4" style={{marginBottom: 16}}>Belum ada kelas satupun</Typography>
          <Typography variant="body">Mulai buat kelas dengan tekan tombol ‘Tambah Kelas’ atau ‘Gabung Kelas’ untuk mulai kelola kelas Anda</Typography>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Header />
      <Container maxWidth="lg">
        <main style={{ flexGrow: 2 }}>
          <div className={classes.toolbar}>
            <Grid container spacing={3}>
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
      <Footer />
    </>
  );
}

export default Dashboard;
