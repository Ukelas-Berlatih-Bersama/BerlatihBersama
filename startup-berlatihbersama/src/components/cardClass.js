import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Box,
  Modal,
  Menu,
  MenuItem,
  Button,
  IconButton,
  ButtonGroup,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import qoreContext from "../qoreContext";

function getModalStyle() {
  return {
    margin: "-5% 10px",
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 4px 10px rgba(107, 115, 128, 0.05)",
  },
  content: {
    cursor: "pointer",
    backgroundColor: "#4267E9",
    color: "white",
  },
  footer: {
    color: "#111828",
    padding: 16,
  },
  modal: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid blue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CardClass({ room }) {
  // console.log(room, ">>>room");
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [buka, setBuka] = useState(false);
  const [edit, setEdit] = useState("");
  const [year, setYear] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);

  const { updateRow } = qoreContext.view("allClassroom").useUpdateRow();
  // console.log(status, "status<<<<");
  // console.log(updateRow, "<<< update");

  const { deleteRow } = qoreContext.view("allClassroom").useDeleteRow();
  // console.log(deleteRow, "delete <<<<");

  const history = useHistory();
  const handleOpenRoom = (event) => {
    if (event.target == event.currentTarget) {
      event.stopPropagation();
      history.push(`/classroom/${room.id}`);
    }
  };

  async function editClassroom(event) {
    event.preventDefault();
    await updateRow(room.id, { name: edit, schoolYear: year }).then(
      window.location.reload()
    );
  }

  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setBuka(false);
    setOpen(false);
  };

  const handleMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShut = (event) => {
    event.preventDefault();
    setAnchorEl(null);
  };

  const handleBuka = () => {
    setBuka(true);
  };

  const editMenu = (
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
        <form onSubmit={editClassroom} className={classes.modal}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Edit Kelas
          </Typography>
          <div>
            <Typography
              variant="subtitle1"
              style={{ margin: "10px 0 -10px 0" }}
            >
              Nama kelas
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="kelas"
              label="Nama kelas"
              name="kelas"
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
              Tahun Ajaran
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="kelas"
              label="Tahun Ajaran"
              name="kelas"
              value={year}
              fullWidth
              onChange={(e) => setYear(e.target.value)}
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
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={modalStyle} className={classes.modal}>
          <Typography variant="h6" id="simple-modal-title">
            Hapus {room.name}?
          </Typography>
          <Typography
            variant="subtitle2"
            id="simple-modal-description"
            style={{ color: "gray", margin: "15px 0 15px 0" }}
          >
            Anda yakin untuk menghapus kelas ini? Setelah dihapus, {room.name}{" "}
            tidak dapat dikembalikan lagi. Semua data yang ada akan terhapus.
          </Typography>
          <ButtonGroup
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
            size="small"
          >
            <Button
              style={{ paddingRight: 25 }}
              variant="text"
              color="primary"
              onClick={handleClose}
            >
              Batal
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={async (e) => {
                e.preventDefault();
                await deleteRow(room.id).then(() => {
                  window.location.reload();
                });
              }}
            >
              Hapus
            </Button>
          </ButtonGroup>
        </div>
      </Modal>
    </Menu>
  );

  return (
    <Card className={classes.root}>
      <CardActionArea component="div">
      <CardContent className={classes.content} onClick={handleOpenRoom}>
        <Box
          onClick={handleOpenRoom}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h5"
            component="h5"
            onClick={handleOpenRoom}
            style={{ fontWeight: "bold" }}
          >
            {room.name}
          </Typography>

          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMore}
            style={{ color: "white" }}
          >
            <MoreVert />
          </IconButton>
        </Box>
        {editMenu}
        <Typography style={{ fontSize: 14 }} onClick={handleOpenRoom}>
          Tahun Ajaran: {room.schoolYear}
        </Typography>
      </CardContent>
      </CardActionArea>
      <Box
        className={classes.footer}
        display="flex"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <DescriptionOutlinedIcon style={{ marginRight: 4 }} />
          <Typography style={{ fontSize: 14 }}>
            {room.subjectCount} Mata Pelajaran
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <PersonOutlineIcon style={{ marginRight: 4 }} />
          <Typography style={{ fontSize: 14 }}>
            {room.studentCount} Siswa
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
