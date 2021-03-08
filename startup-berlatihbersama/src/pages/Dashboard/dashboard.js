import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Grid, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
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
  container: {
    padding: "0 5em 0em 5em",
  },
}));

function Dashboard() {
  const classes = useStyle();

  const { user, status } = qoreContext.useCurrentUser();
  // console.log(JSON.stringify(user, ["data"], 2), ">>> user");
  // console.log(status, ">>>> status");

  const { data: classroom } = qoreContext.view("allClassroom").useListRow();

  // const emptyClassroom = (
  //   <Container maxWidth="lg" style={{ textAlign: "center" }}>
  //     <img src={chalkBoardIllustration} style={{ marginBottom: 32 }} />
  //     <Typography variant="h4" style={{ marginBottom: 16 }}>
  //       Belum ada kelas satupun
  //     </Typography>
  //     <Typography variant="body1">
  //       Mulai buat kelas dengan tekan tombol ‘Tambah Kelas’ atau ‘Gabung Kelas’
  //       untuk mulai kelola kelas Anda
  //     </Typography>
  //   </Container>
  // );

  // TODO: implement preloading
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
      <Header />
      {classroom.length > 0 && status == "success"? (
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
      ): preloadingClassroom}

      <Footer />
    </>
  );
}

export default Dashboard;
