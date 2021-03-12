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

export default function CardClass({ room, onUpdated }) {
  const classes = useStyles();

  const [name, setName] = useState(room.name);
  const [year, setYear] = useState(room.schoolYear);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [isLoading, setIsLoading] = useState(false);

  const { updateRow } = qoreContext.view("allClassroom").useUpdateRow();
  const { deleteRow } = qoreContext.view("allClassroom").useDeleteRow();

  const history = useHistory();

  const handleOpenRoom = (event) => {
    if (event.target == event.currentTarget) {
      event.stopPropagation();
      history.push(`/classroom/${room.id}`);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await updateRow(room.id, { name: name, schoolYear: year }).then(() => {
      onUpdated();
      setIsLoading(false);
      setOpenEditForm(false);
    });
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteRow(room.id).then(() => {
      onUpdated();
      setIsLoading(false);
      setOpenDeleteDialog(false);
    });
  };

  const formEdit = (
    <Modal
      open={openEditForm}
      onClose={() => setOpenEditForm(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleEdit} className={classes.modal}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Edit Kelas
        </Typography>
        <div>
          <Typography style={{ marginBottom: 10, marginTop: 16 }}>
            Nama kelas
          </Typography>
          <TextField
            variant="outlined"
            required
            placeholder="Nama kelas"
            value={name}
            autoFocus
            fullWidth
            onChange={(e) => setName(e.target.value)}
          ></TextField>
        </div>
        <div>
          <Typography style={{ marginBottom: 10, marginTop: 16 }}>
            Tahun Ajaran
          </Typography>
          <TextField
            variant="outlined"
            required
            placeholder="Tahun Ajaran"
            value={year}
            fullWidth
            onChange={(e) => setYear(e.target.value)}
          ></TextField>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button color="secondary" onClick={() => setOpenEditForm(false)}>
            Tutup
          </Button>
          <Button color="primary" type="submit" disabled={isLoading}>
            Simpan
          </Button>
        </div>
      </form>
    </Modal>
  );

  const deleteConfirmDialog = (
    <Modal
      open={openDeleteDialog}
      onClose={() => setOpenDeleteDialog(false)}
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
            style={{ marginRight: 25 }}
            variant="text"
            onClick={() => setOpenDeleteDialog(false)}
          >
            Batal
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Hapus
          </Button>
        </ButtonGroup>
      </div>
    </Modal>
  );

  const editMenu = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem
        style={{ color: "blue" }}
        onClick={() => {
          setOpenEditForm(true);
          setAnchorEl(null);
        }}
      >
        Edit
      </MenuItem>

      <MenuItem
        style={{ color: "red" }}
        onClick={() => {
          setOpenDeleteDialog(true);
          setAnchorEl(null);
        }}
      >
        Hapus
      </MenuItem>
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
              onClick={(event) => setAnchorEl(event.currentTarget)}
              style={{ color: "white" }}
            >
              <MoreVert />
            </IconButton>
          </Box>
          {editMenu}
          {formEdit}
          {deleteConfirmDialog}
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
