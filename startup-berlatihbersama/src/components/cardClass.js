import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  Button,
  CardActions,
} from "@material-ui/core";
import qoreContext from "../qoreContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: "25%",
    alignContent: "center",
  },
  media: {
    height: 100,
  },
}));

export default function CardClass({ room }) {
  console.log(room, ">>> room");
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={room.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {room.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/classroom/${room.id}`}>
          <Button size="medium" color="primary">
            Masuk
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
