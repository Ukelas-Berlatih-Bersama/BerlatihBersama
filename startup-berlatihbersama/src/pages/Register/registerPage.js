import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Button,
  Grid,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100hv",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    width: 400,
  },
  media: {
    height: 400,
  },
}));

export default function MediaCard() {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <Container className={classes.container}>
        {/* <Typography>REGISTER</Typography> */}
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
                  <CardMedia
                    className={classes.media}
                    image="https://media.istockphoto.com/vectors/back-to-school-concept-with-young-smiling-woman-teacher-and-group-of-vector-id1173081238?k=6&m=1173081238&s=612x612&w=0&h=1vlJB89YaIm5ZateN4pcs5q5xTAu3DUxg-OETok6O7M="
                    // title="Contemplative Reptile"
                  />
                </Link>
              </CardActionArea>
              <CardActions>
                <Button size="large" color="primary">
                  Guru
                </Button>
              </CardActions>
            </Card>
            <Card className={classes.root}>
              <CardActionArea>
                <Link to="/registerStudent">
                  <CardMedia
                    className={classes.media}
                    image="https://media.istockphoto.com/vectors/woman-with-laptop-studying-or-working-concept-table-with-books-lamp-vector-id1164538944?k=6&m=1164538944&s=612x612&w=0&h=jbDbq7B1RjXr_F-GUoseLBXZcUmgyNAGiTWrycEq6Oo="
                    // title="Contemplative Reptile"
                  />
                </Link>
              </CardActionArea>
              <CardActions>
                <Button size="large" color="primary">
                  Siswa
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Link to="/login" variant="body2">
                Back to Login Page
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
