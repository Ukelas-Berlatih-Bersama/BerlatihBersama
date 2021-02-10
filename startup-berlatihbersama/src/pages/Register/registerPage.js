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
import { ReactComponent as imageTeacher } from "../image/illustration_teacher";
import { ReactComponent as imageStudent } from "../image/illustration_student";

const useStyles = makeStyles((theme) => ({
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
    height: 300,
  },
}));

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Container style={{ height: "100hv" }}>
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
              <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
            </CardActionArea>
            <CardActions>
              <Button size="big" color="primary">
                Guru
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
            </CardActionArea>
            <CardActions>
              <Button size="big" color="primary">
                Siswa
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    </Container>
  );
}
