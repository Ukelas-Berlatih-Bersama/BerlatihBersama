import React from "react";
import { Container, Typography, Button, Box, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
}));

const Header = (props) => {
  const [openJoinRoom, setOpenJoinRoom] = React.useState(false);
  const [openCreateRoom, setOpenCreateRoom] = React.useState(false);

  const classes = useStyle();

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
    >
      <div className={classes.paper}>
        <h2 id="simple-modal-title">Gabung Kelas</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </div>
    </Modal>
  );

  const createRoomModal = (
    <Modal
      open={openCreateRoom}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <h2 id="simple-modal-title">Buat Kelas Baru</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </div>
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
