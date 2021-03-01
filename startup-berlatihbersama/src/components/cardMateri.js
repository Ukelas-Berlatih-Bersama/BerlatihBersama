import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Modal,
  TextField,
  Paper,
  Menu,
  MenuItem,
  ButtonGroup,
  Grid,
  Container,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import qoreContext from "../qoreContext";
import { Link } from "react-router-dom";
import { ArrowRight, MoreVert, Image, Description } from "@material-ui/icons";
import LinkIcon from "@material-ui/icons/Link";

function getModalStyle() {
  return {
    margin: "-5% 10px",
  };
}

const useStyles = makeStyles((theme) => ({
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

export default function CardMateri({ node }) {
  // console.log(node.id, ">>> room");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [buka, setBuka] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [img, setImg] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [edit, setEdit] = useState("");
  const [desc, setDesc] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);

  const { data: modul, status } = qoreContext
    .view("allModule")
    .useGetRow(node.id);
  console.log(JSON.stringify(modul, null, 2), ">>>> id");

  const { updateRow } = qoreContext.view("allModule").useUpdateRow();
  // console.log(updateRow, ">> update");
  // console.log(status, ">>>> status");

  const { deleteRow } = qoreContext.view("allModule").useDeleteRow();
  // console.log(deleteRow, ">>>> delete");

  async function editMateri(e) {
    e.preventDefault();
    // console.log(node.id, ">>>di editSubject()");
    await updateRow(node.id, { title: edit, description: desc }).then(
      handleClose
    );
    // window.location.reload();
  }

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMore = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleShut = () => {
    setAnchorEl(null);
  };

  const handleBuka = () => {
    setBuka(true);
  };

  const handleTutup = () => {
    setBuka(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleUnshow = () => {
    setShow(false);
  };

  const handleShowImage = (url) => {};

  const handleHide = () => {
    setImg(false);
  };

  return (
    <>
      {status == "success" ? (
        <Grid>
          <Paper
            style={{
              margin: "10px 0 10px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
            elevation={3}
            square
          >
            <Link
              to={`/assignment/${node.id}`}
              style={{
                textDecoration: "none",
                color: "black",
                width: "82%",
              }}
            >
              <Typography
                gutterBottom
                variant="subtitle1"
                component="h1"
                style={{
                  fontWeight: "bold",
                }}
              >
                {
                  // <IconButton>
                  <ArrowRight
                    fontSize="small"
                    style={{
                      color: "blue",
                      margin: "8px 10px 0 10px",
                    }}
                  />
                }
                {node.displayField}
              </Typography>
            </Link>
            <Link
              to={`/assignment/${node.id}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <Button
                variant="text"
                color="secondary"
                size="small"
                style={{ marginTop: 5 }}
              >
                Tugas Materi
              </Button>
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
              <MenuItem style={{ color: "blue" }} onClick={handleOpen}>
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
                <form onSubmit={editMateri} className={classes.modal}>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Edit Materi
                  </Typography>
                  <div>
                    <Typography
                      variant="subtitle1"
                      style={{ margin: "10px 0 -10px 0" }}
                    >
                      Judul
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="judul"
                      label="Judul Materi"
                      name="judul"
                      value={edit}
                      autoFocus
                      fullWidth
                      onChange={(e) => setEdit(e.target.value)}
                    ></TextField>
                  </div>
                  <div>
                    <Typography
                      variant="subtitle1"
                      style={{ margin: "10px 0 -10px 0" }}
                    >
                      Deskripsi
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="description"
                      label="Deskripsi"
                      name="description"
                      fullWidth
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    ></TextField>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button color="primary" type="submit">
                      Edit
                    </Button>
                    <Button color="secondary" onClick={handleClose}>
                      Tutup
                    </Button>
                  </div>
                </form>
              </Modal>
              <MenuItem style={{ color: "red" }} onClick={handleBuka}>
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
                    Anda yakin untuk menghapus materi ini? Setelah dihapus,
                    semua data materi ini akan terhapus.
                  </Typography>
                  <ButtonGroup
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    size="small"
                  >
                    <Button
                      variant="text"
                      color="primary"
                      onClick={handleTutup}
                    >
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
          </Paper>
          <Paper style={{ marginTop: -10 }} elevation={2} square>
            <Container>
              <Typography variant="body2" style={{ padding: "10px 0 0 0" }}>
                {modul.description}
              </Typography>
              <ButtonGroup
                style={{
                  display: "flex",
                  justifyContent: "left",
                  padding: "10px 0 10px 0",
                }}
                size="small"
              >
                {modul.image ? (
                  <form action={modul.image} method="get" target="_blank">
                    <Button
                      startIcon={<Image />}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Image
                    </Button>
                  </form>
                ) : (
                  <form>
                    <Button
                      startIcon={<Image />}
                      variant="contained"
                      color="primary"
                      // type="submit"
                      disabled
                    >
                      Image
                    </Button>
                  </form>
                )}

                {modul.url ? (
                  <form action={modul.url} method="get" target="_blank">
                    <Button
                      startIcon={<Description />}
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      Artikel
                    </Button>
                  </form>
                ) : (
                  <form>
                    <Button
                      startIcon={<Description />}
                      variant="contained"
                      color="secondary"
                      // type="submit"
                      disabled
                    >
                      Artikel
                    </Button>
                  </form>
                )}
              </ButtonGroup>
            </Container>
          </Paper>
        </Grid>
      ) : null}
    </>
  );
}
