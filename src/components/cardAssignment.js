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
  IconButton,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import qoreContext from "../qoreContext";
import { ArrowRight, MoreVert, Image } from "@material-ui/icons";
import Moment from "react-moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

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
  paper: {
    display: "flex",
    margin: "10px 0 10px 0",
    justifyContent: "space-between",
  },
  gray: {
    display: "flex",
  },
}));

export default function CardAssignment({ node }) {
  const classes = useStyles();
  //   console.log(node, ">>> node assign");
  const [open, setOpen] = React.useState(false);
  const [buka, setBuka] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [edit, setEdit] = useState("");
  const [desc, setDesc] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: assignment, status } = qoreContext
    .view("allAssignment")
    .useGetRow(node.id);
  console.log(assignment, ">>>> id");

  const { updateRow } = qoreContext.view("allAssignment").useUpdateRow();
  //   console.log(updateRow, ">> update");
  //   console.log(status, ">>>> status");

  const { deleteRow } = qoreContext.view("allAssignment").useDeleteRow();
  // console.log(deleteRow, ">>>> delete");

  async function editAssignment(e) {
    e.preventDefault();
    // console.log(node.id, ">>>di editSubject()");
    await updateRow(node.id, {
      name: edit,
      description: desc,
      deadline: selectedDate,
    }).then(handleClose);
    window.location.reload();
  }

  const handleChangeDate = (date) => {
    setSelectedDate(date);
  };

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

  return (
    <>
      {status == "success" ? (
        <Grid>
          <Paper className={classes.paper} elevation={3} square>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="h1"
              style={{
                fontWeight: "bold",
              }}
            >
              {
                <IconButton>
                  <ArrowRight
                    fontSize="small"
                    style={{
                      color: "blue",
                      //   margin: "0 0 0 10px",
                    }}
                  />
                </IconButton>
              }
              {node.displayField}
            </Typography>
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
                <form onSubmit={editAssignment} className={classes.modal}>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Edit Tugas
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
                      fullWidth
                      autoFocus
                      onChange={(e) => setEdit(e.target.value)}
                    ></TextField>
                  </div>
                  <div>
                    <Typography
                      variant="subtitle1"
                      style={{ margin: "10px 0 -10px 0" }}
                    >
                      Isi Tugas
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
                  <div>
                    <Typography
                      variant="subtitle1"
                      style={{ margin: "10px 0 -10px 0" }}
                    >
                      Deadline
                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDateTimePicker
                        value={selectedDate}
                        onChange={handleChangeDate}
                        label="Tanggal dan waktu"
                        showTodayButton
                        inputVariant="outlined"
                        id="time"
                        name="time"
                        fullWidth
                        style={{ marginTop: 15 }}
                      ></KeyboardDateTimePicker>
                    </MuiPickersUtilsProvider>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 20,
                    }}
                  >
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
              <div className={classes.gray}>
                <Typography variant="caption" style={{ color: "#6B7380" }}>
                  Batas waktu:
                </Typography>
                <Typography variant="caption" style={{ paddingLeft: 5 }}>
                  <Moment format="D MMM YYYY">{assignment.deadline}</Moment>
                </Typography>
              </div>
              <Typography variant="body2" style={{ padding: "10px 0 0 0" }}>
                {assignment.description}
              </Typography>
              <ButtonGroup
                style={{
                  display: "flex",
                  justifyContent: "left",
                  padding: "10px 0 10px 0",
                }}
                size="small"
              >
                {assignment.image ? (
                  <form action={assignment.image} method="get" target="_blank">
                    <Button
                      startIcon={<Image />}
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="small"
                    >
                      Gambar
                    </Button>
                  </form>
                ) : (
                  <form>
                    <Button
                      startIcon={<Image />}
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled
                    >
                      Gambar
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
