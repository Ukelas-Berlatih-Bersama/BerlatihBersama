import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
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

  const emptyClassroom = (
    <Container maxWidth="lg" style={{ textAlign: "center" }}>
      <img src={chalkBoardIllustration} style={{ marginBottom: 32 }} />
      <Typography variant="h4" style={{ marginBottom: 16 }}>
        Belum ada kelas satupun
      </Typography>
      <Typography variant="body">
        Mulai buat kelas dengan tekan tombol ‘Tambah Kelas’ atau ‘Gabung Kelas’
        untuk mulai kelola kelas Anda
      </Typography>
    </Container>
  );

  const preloadingClassroom = (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Skeleton variant="rect" width={400} height={150} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rect" width={400} height={150} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rect" width={400} height={150} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rect" width={400} height={150} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rect" width={400} height={150} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rect" width={400} height={150} />
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Header />
      {status == "idle" ? preloadingClassroom : null}

      {status == "success" && classroom.length <= 0 ? (
        emptyClassroom
      ) : (
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
      )}

      <Footer />
    </>
  );
}

export default Dashboard;
