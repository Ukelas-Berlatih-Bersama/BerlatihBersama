import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    width: 400,
    padding: "2em",
  },
  media: {
    height: "10em",
    width: "10em",
  },
}));
const svgIcon = (
  <Icon>
    <img alt="edit" src="https://i.imgur.com/XPmFXHy.png" />
  </Icon>
);
export default function MediaCard() {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <Box
        display="flex"
        p={1}
        bgcolor="background.paper"
        style={{ margin: "0 3em" }}
      >
        <Box p={1} width="100%">
          {svgIcon}
        </Box>
        <Box p={1} flexShrink={0}>
          Sudah punya akun?
          <Link to="/login" style={{ textDecoration: "none" }}>
            Masuk Sekarang
          </Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" style={{ marginTop: "5rem" }}>
        <Typography component="h1" variant="h4">
          Pendaftaran Akun.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography component="h1" variant="h4">
          Silahkan pilih jenis akun Anda
        </Typography>
      </Box>
      <Container>
        <div className={classes.paper}>
          <Grid
            item
            xs={12}
            container
            spacing={2}
            // direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Card className={classes.root}>
              <CardActionArea>
                <Link to="/registerTeacher">
                  <Box align="center">
                    <CardMedia
                      className={classes.media}
                      image="https://i.imgur.com/PJeRJQ0.png"
                    />
                  </Box>
                </Link>
              </CardActionArea>
              <Typography
                align="center"
                style={{ fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Akun Guru
              </Typography>
              <Typography
                align="center"
                style={{ fontSize: "1rem", color: "#6B7380" }}
              >
                Digunakan oleh guru atau asisten guru untuk mengelola kelas,
                mengelola materi dan tugas
              </Typography>
            </Card>
            <Card className={classes.root}>
              <CardActionArea>
                <Link to="/registerStudent">
                  <Box align="center">
                    <CardMedia
                      className={classes.media}
                      image="https://i.imgur.com/Ido9BDM.png"
                    />
                  </Box>
                </Link>
              </CardActionArea>
              <Typography
                align="center"
                style={{ fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Akun Siswa
              </Typography>
              <Typography
                align="center"
                style={{ fontSize: "1rem", color: "#6B7380" }}
              >
                Digunakan oleh siswa untuk melihat materi dan tugas yang
                tersedia
              </Typography>
            </Card>
          </Grid>
          {/* <Grid container justify="center">
            <Grid item>
              <Link to="/login" variant="body2">
                Back to Login Page
              </Link>
            </Grid>
          </Grid> */}
          <Typography
            style={{ fontSize: ".7rem", color: "#6B7380", marginTop: "15em" }}
          >
            2020 © Berlatihbersama. All rights reserved.
          </Typography>
        </div>
      </Container>
    </div>
  );
}
