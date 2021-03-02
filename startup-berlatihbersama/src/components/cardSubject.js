import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Button,
  CardActions,
  Modal,
  TextField,
  MenuItem,
  Menu,
  ButtonGroup,
} from "@material-ui/core";
import qoreContext from "../qoreContext";
import { Link } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";

function getModalStyle() {
  return {
    margin: "-5% 10px",
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    marginTop: "10%",
    alignContent: "center",
    backgroundColor: "#f5f5f5",
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid blue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  media: {
    height: 50,
  },
}));

export default function CardSubject({ node }) {
  // console.log(node, ">>> room");
  const classes = useStyles();
  const [buka, setBuka] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalStyle] = React.useState(getModalStyle);

  const { updateRow, status } = qoreContext.view("allSubject").useUpdateRow();

  const { deleteRow } = qoreContext.view("allSubject").useDeleteRow();
  //   console.log(deleteRow, ">>>> delete");
  // console.log(status, ">>>> status");

  async function editSubject(e) {
    e.preventDefault();
    // console.log(node.id, ">>>di editSubject()");
    await updateRow(node.id, { name: edit });
    window.location.reload();
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuka = () => {
    setBuka(true);
  };

  const handleTutup = () => {
    setBuka(false);
  };

  const handleMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShut = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Card className={classes.root}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            to={`/subject/${node.id}`}
            style={{ textDecoration: "none", color: "black", width: "80%" }}
          >
            <CardActionArea>
              <CardContent>
                <Typography color="primary" variant="h6">
                  {node.displayField}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMore}
          >
            <MoreVert />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleShut}
          >
            <MenuItem onClick={handleOpen} style={{ color: "blue" }}>
              Edit
            </MenuItem>
            <Modal
              open={open}
              onClose={handleClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <form
                onSubmit={editSubject}
                className={classes.modal}
                style={modalStyle}
              >
                <Typography variant="h6">Edit Mata Pelajaran</Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="name"
                  label="Nama Mata Pelajaran"
                  name="name"
                  value={edit}
                  onChange={(e) => setEdit(e.target.value)}
                  style={{ margin: "15px 0 15px 0" }}
                ></TextField>
                <ButtonGroup
                  size="small"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button color="primary" variant="text" onClick={handleClose}>
                    Batal
                  </Button>
                  <Button
                    style={{ color: "blue" }}
                    variant="text"
                    type="submit"
                  >
                    Simpan Perubahan
                  </Button>
                </ButtonGroup>
              </form>
            </Modal>
            <MenuItem onClick={handleBuka} style={{ color: "red" }}>
              Hapus
            </MenuItem>
            <Modal
              open={buka}
              onClose={handleTutup}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={modalStyle} className={classes.modal}>
                <Typography variant="h6" id="simple-modal-title">
                  Hapus {node.displayField}?
                </Typography>
                <Typography
                  variant="subtitle2"
                  id="simple-modal-description"
                  style={{ color: "gray", margin: "15px 0 15px 0" }}
                >
                  Anda yakin untuk menghapus {node.displayField}? Setelah
                  dihapus, semua data {node.displayField} akan terhapus.
                </Typography>
                <ButtonGroup
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  size="small"
                >
                  <Button variant="text" color="primary" onClick={handleTutup}>
                    Batal
                  </Button>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={async (e) => {
                      e.preventDefault();
                      await deleteRow(node.id).then((data) => {
                        // console.log(data, "data delete >>>");
                        if (data == true) {
                          window.location.reload();
                        }
                      });
                    }}
                  >
                    Hapus
                  </Button>
                </ButtonGroup>
              </div>
            </Modal>
          </Menu>
        </div>
      </Card>
    </div>
  );
}
