import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
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
  },
}));

const Header = (props) => {
  const [open, setOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyle();

  const handleCreateClassroom = () => {
    setOpen(true);
    setModalContent(newClassroomContent);
  };

  const handleJoinClassroom = () => {
    setOpen(true);
    setModalContent(joinClassroomContent);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const newClassroomContent = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Buat Kelas Baru</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  const joinClassroomContent = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Gabung Kelas</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        style={{ padding: "0 1em", margin: "5em auto" }}
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {modalContent}
          </Modal>
        </Box>
      </Box>
    </Container>
  );
};

export default Header;
