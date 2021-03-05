import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import qoreContext from "../../qoreContext";

function getModalStyle() {
  return {
    margin: "auto",
  };
}

const useStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50vh",
    left: "50vw",
    transform: "translate(-50%, -50%)",
  },
  modal: {
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid blue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Header = (data) => {
  // console.log(data.userId, ">>> class id");
  const [openJoinRoom, setOpenJoinRoom] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [openCreateRoom, setOpenCreateRoom] = React.useState(false);
  const [nama, setNama] = useState("");
  const [desc, setDesc] = useState("");
  const [year, setYear] = useState("");
  const [code, setCode] = useState("");
  const [joincode, setJoincode] = useState("");
  const history = useHistory();

  const classes = useStyle();

  const { send, status } = qoreContext
    .view("allClassroom")
    .useForm("addNewClass");
  // console.log(status, ">>> status");

  const { addRelation, removeRelation, statuses, errors } = qoreContext
    .view("allMember")
    .useRelation(data.userId);

  async function addNewClass(e) {
    e.preventDefault();
    await send({
      name: nama,
      description: desc,
      schoolYear: year,
      code: code,
    }).then((data) => {
      // console.log(data.id, ">>> data");
      let classId = data.id;
      return addRelationClass({ e, classId });
    });
  }

  async function addRelationClass({ e, classId }) {
    e.preventDefault();
    await addRelation({
      classroom: [classId],
    });
    window.location.reload();
  }

  const handleCreateClassroom = () => {
    setOpenCreateRoom(true);
  };

  const handleJoinClassroom = () => {
    setOpenJoinRoom(true);
  };

  const handleClose = () => {
    setOpenJoinRoom(false);
    setOpenCreateRoom(false);
  };

  const joinRoomModal = (
    <Modal
      open={openJoinRoom}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form className={classes.modal} style={modalStyle}>
        <Typography variant="h6">Gabung Kelas</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="code"
          label="Masukkan Kode kelas"
          name="code"
          autoFocus
          fullWidth
          value={joincode}
          onChange={(e) => setJoincode(e.target.value)}
        ></TextField>
        <div
          style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            style={{ color: "GrayText", paddingRight: 25 }}
            onClick={handleClose}
          >
            Batal
          </Button>
          <Button color="primary" type="submit">
            Gabung
          </Button>
        </div>
      </form>
    </Modal>
  );

  const createRoomModal = (
    <Modal
      open={openCreateRoom}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={addNewClass} className={classes.modal}>
        <Typography variant="h6">Buat Kelas Baru</Typography>
        <div style={{ marginTop: 10 }}>
          <Typography variant="body2" style={{ marginBottom: -10 }}>
            Nama
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="Masukkan Nama kelas"
            name="name"
            autoFocus
            value={nama}
            fullWidth
            onChange={(e) => setNama(e.target.value)}
          ></TextField>
        </div>
        <div style={{ marginTop: 10 }}>
          <Typography variant="body2" style={{ marginBottom: -10 }}>
            Deskripsi
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            id="description"
            label="Deskripsi kelas"
            name="description"
            fullWidth
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></TextField>
        </div>
        <div style={{ marginTop: 10 }}>
          <Typography variant="body2" style={{ marginBottom: -10 }}>
            Tahun Pelajaran
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="year"
            label="Tahun Pelajaran"
            name="year"
            fullWidth
            value={year}
            onChange={(e) => setYear(e.target.value)}
          ></TextField>
        </div>
        <div style={{ marginTop: 10 }}>
          <Typography variant="body2" style={{ marginBottom: -10 }}>
            Kode Kelas
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="code"
            label="Masukkan kode kelas"
            name="code"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></TextField>
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}
        >
          <Button
            size="small"
            style={{ color: "GrayText" }}
            onClick={handleClose}
          >
            Batal
          </Button>
          <Button color="primary" type="submit" size="small">
            Buat Kelas
          </Button>
        </div>
      </form>
    </Modal>
  );

  return (
    <>
      {joinRoomModal}
      {createRoomModal}
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ margin: "5em auto" }}
        >
          <Box>
            <Typography variant="h4" style={{ marginBottom: 12 }}>
              Semua Kelas
            </Typography>
            <Typography>Pilih dan kelola kelas Anda dengan mudah</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={handleCreateClassroom}
            >
              Tambah Kelas
            </Button>
            <Button
              id="btn-join"
              variant="outlined"
              color="primary"
              className={classes.margin}
              onClick={handleJoinClassroom}
            >
              Gabung Kelas
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Header;
