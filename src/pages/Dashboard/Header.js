import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import qoreContext from "../../qoreContext";
import uniqid from "uniqid";

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

const Header = (props) => {
  const [modalStyle] = useState(getModalStyle);
  const [openJoinRoom, setOpenJoinRoom] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [nama, setNama] = useState("");
  const [year, setYear] = useState("");
  const [joincode, setJoincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem("user_id");
  const classes = useStyle();

  const { insertRow } = qoreContext.view("allClassroom").useInsertRow();
  const { addRelation } = qoreContext.view("allMember").useRelation(userId);

  async function addNewClass(e) {
    e.preventDefault();
    setIsLoading(true);
    await insertRow({
      name: nama,
      schoolYear: year,
      teacher: [userId],
      inviteCode: uniqid.time(),
    }).then((room) => {
      return addRelation({
        classroom: [room.id],
      });
    }).catch(error => {
      console.info(error);
    });
    props.onRoomAdded();
    setIsLoading(false);
    setOpenCreateRoom(false);
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
            placeholder="Masukan Nama kelas"
            autoFocus
            value={nama}
            fullWidth
            onChange={(e) => setNama(e.target.value)}
          ></TextField>
        </div>

        <div style={{ marginTop: 10 }}>
          <Typography variant="body2" style={{ marginBottom: -10 }}>
            Tahun Ajaran
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            placeholder="contoh: 2020/2021"
            fullWidth
            value={year}
            onChange={(e) => setYear(e.target.value)}
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
          <Button color="primary" type="submit" size="small" disabled={isLoading} >
            {isLoading ? <CircularProgress size={16} style={{marginRight: 10}}/>:null}
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
              Ruang Kelas Anda
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
              + Tambah Kelas
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
