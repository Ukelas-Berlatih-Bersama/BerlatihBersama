import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Box,
  CardActions,
  Modal,
  Menu,
  MenuItem,
  Button,
  ButtonGroup,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
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
    backgroundColor: "#4267E9",
    color: "white",
  },
  action: {
    color: "#111828",
    display: "flex",
    justifyContent: "space-between",
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

  const [open, setOpen] = React.useState(false);
  const [buka, setBuka] = React.useState(false);
  const [edit, setEdit] = useState("");
  const [year, setYear] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);

  const { updateRow, status } = qoreContext.view("allClassroom").useUpdateRow();
  // console.log(status, "status<<<<");
  // console.log(updateRow, "<<< update");

  const { deleteRow } = qoreContext.view("allClassroom").useDeleteRow();
  // console.log(deleteRow, "delete <<<<");

  async function editClassroom(e) {
    e.preventDefault();
    await updateRow(room.id, { name: edit, schoolYear: year }).then(
      window.location.reload()
    );
  }

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    setBuka(false);
    setOpen(false);
  };

  const handleMore = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleShut = (e) => {
    e.preventDefault();
    setAnchorEl(null);
  };

  const handleBuka = () => {
    setBuka(true);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.content}>
        <CardContent
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link
            to={`/classroom/${room.id}`}
            style={{ textDecoration: "none", color: "white", width: "80%" }}
          >
            <div>
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
            </div>
          </Link>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMore}
            style={{ color: "white" }}
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
                  Anda yakin untuk menghapus kelas ini? Setelah dihapus,{" "}
                  {room.name} tidak dapat dikembalikan lagi. Semua data yang ada
                  akan terhapus.
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
                      await deleteRow(room.id).then((data) => {
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
