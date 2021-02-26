import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  Modal,
  TextField,
} from "@material-ui/core";
import qoreContext from "../qoreContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    marginTop: "10%",
    alignContent: "center",
  },
  modal: {
    display: "flex",
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  media: {
    height: 50,
  },
}));

export default function CardMateri({ node }) {
  //   console.log(node.id, ">>> room");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState("");

  const { updateRow, status } = qoreContext.view("allModule").useUpdateRow();

  const { deleteRow } = qoreContext.view("allModule").useDeleteRow();
  //   console.log(deleteRow, ">>>> delete");
  //   console.log(status, ">>>> status");

  async function editSubject(e) {
    e.preventDefault();
    // console.log(node.id, ">>>di editSubject()");
    await updateRow(node.id, { name: edit });
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card className={classes.root}>
        <Link to={`/subject/${node.id}`}>
          <CardActionArea>
            <CardMedia className={classes.media} image={node.displayField} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {node.displayField}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button size="medium" color="primary" onClick={handleOpen}>
            Edit
          </Button>
          <Modal open={open} onClose={handleClose}>
            <form onSubmit={editSubject} className={classes.modal}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="name"
                label="Nama Mata Pelajaran"
                name="name"
                autoComplete="name"
                value={edit}
                autoFocus
                onChange={(e) => setEdit(e.target.value)}
              ></TextField>
              <div style={{ display: "table-row" }}>
                <Button color="primary" type="submit">
                  Edit
                </Button>
                <Button color="secondary" onClick={handleClose}>
                  Tutup
                </Button>
              </div>
            </form>
          </Modal>
          <Button
            size="medium"
            color="secondary"
            onClick={async (e) => {
              e.preventDefault();
              await deleteRow(node.id);
            }}
          >
            Hapus
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
