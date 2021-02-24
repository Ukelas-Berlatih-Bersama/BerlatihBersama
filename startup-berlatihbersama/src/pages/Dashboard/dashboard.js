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

import chalkBoardIllustration from "../../image/class-chalkboard.svg";

const drawerWidth = 200;

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

  console.log(status, "<<<status");
  console.log(classroom, "<<<classroom");

  const header = (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        style={{ padding: "0 1em", margin: "5em auto" }}
      >
        <Box>
          <Typography variant="h4" style={{marginBottom: 12}}>Semua Kelas</Typography>
          <Typography>Pilih dan kelola kelas Anda dengan mudah</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            Tambah Kelas
          </Button>
          <Button variant="outlined" color="primary" className={classes.margin}>
            Gabung Kelas
          </Button>
        </Box>
      </Box>
    </Container>
  );

  if (classroom.length <= 0) {
    return (
      <>
        <CssBaseline />
        <Navbar />
        {header}
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
      {header}
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
      <Footer />
    </>
  );
}

export default Dashboard;
