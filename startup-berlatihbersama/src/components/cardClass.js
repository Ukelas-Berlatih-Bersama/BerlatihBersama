import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  Box,
  CardActions,
} from "@material-ui/core";
import qoreContext from "../qoreContext";
import { Link } from "react-router-dom";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 4px 10px rgba(107, 115, 128, 0.05)",
  },
  content: {
    backgroundColor: "#4267E9",
    color: "white",
  },
  action: {
    backgroundColor: "white",
    color: "#111828",
    display: "flex",
    justifyContent: "space-between",
    padding: 16,
  },
}));

export default function CardClass({ room }) {
  const classes = useStyles();

  return (
    // TODO: handle onclick room (enter the classroom when it clicked)
    <Card className={classes.root}>
      <CardActionArea className={classes.content}>
        <CardContent>
          {/* TODO: Add ction menu for edit and delete room */}
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {room.name}
          </Typography>
          <Typography style={{ fontSize: 14 }}>
            Tahun Ajaran: {room.schoolYear}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Box display="flex" alignItems="center">
          <DescriptionOutlinedIcon style={{ marginRight: 4 }} />
          <Typography style={{ fontSize: 14 }}>
            {room.subject.totalCount} Mata Pelajaran
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <PersonOutlineIcon style={{ marginRight: 4 }} />
          <Typography style={{ fontSize: 14 }}>
            {room.siswa.totalCount} Siswa
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}
