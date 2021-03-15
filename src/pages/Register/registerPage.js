import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  Grid,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import RegisterNavbar from "./RegisterNavbar";
import TeacherIllustration from "../../image/illustration/teacher.svg";
import StudentIllustration from "../../image/illustration/student.svg";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
  },
  root: {
    width: 400,
    border: "1px solid #D1D4DB",
    borderRadius: 4,
    boxShadow: "none",
    padding: "40px 28px",
    "&:hover": {
      backgroundColor: "rgba(66, 103, 233, 0.05)",
      border: "1px solid #4267E9",
    },
  },
  media: {
    height: "100px",
    width: "100px",
    marginBottom: 24,
  },
}));
export default function MediaCard() {
  const classes = useStyles();

  return (
    <>
      <RegisterNavbar />

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
            <Link to="/registerTeacher" className={classes.link}>
              <Card className={classes.root}>
                <Box align="center">
                  <CardMedia
                    className={classes.media}
                    image={TeacherIllustration}
                  />
                </Box>

                <Typography
                  align="center"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: 12,
                  }}
                >
                  Akun Guru
                </Typography>
                <Typography
                  align="center"
                  style={{ fontSize: 16, color: "#6B7380" }}
                >
                  Digunakan oleh guru atau asisten guru untuk mengelola kelas,
                  mengelola materi dan tugas
                </Typography>
              </Card>
            </Link>

            <Link to="/registerStudent" className={classes.link}>
              <Card className={classes.root}>
                <Box align="center">
                  <CardMedia
                    className={classes.media}
                    image={StudentIllustration}
                  />
                </Box>

                <Typography
                  align="center"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: 12,
                  }}
                >
                  Akun Siswa
                </Typography>
                <Typography
                  align="center"
                  style={{ fontSize: 16, color: "#6B7380" }}
                >
                  Digunakan oleh siswa untuk melihat materi <br /> dan tugas
                  yang tersedia
                </Typography>
              </Card>
            </Link>
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
    </>
  );
}
