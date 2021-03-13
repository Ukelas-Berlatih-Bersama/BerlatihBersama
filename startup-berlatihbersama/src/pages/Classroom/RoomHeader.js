import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  Button,
  Modal,
  Container,
  ButtonGroup,
} from "@material-ui/core";
import { ArrowBack, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import qoreContext from "../../qoreContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    outline: "none",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: 8,
    padding: theme.spacing(2, 4, 3),
  },
  buttonGroup: {
    marginTop: "2%",
  },
  menulist: {
    display: "flex",
    justifyContent: "space-around",
    color: "blue",
  },
  root: {
    flexGrow: 1,
  },
  add: {
    display: "flex",
    margin: "25px 0 10px 0",
    justifyContent: "space-between",
  },
}));

const RoomHeader = ({ room, onUpdated }) => {
  const classes = useStyles();
  const [name, setName] = useState(room.name);
  const [schoolYear, setSchoolYear] = useState(room.schoolYear);
  const [openEditForm, setOpenEditForm] = useState(false);
  const { updateRow } = qoreContext.view("allClassroom").useUpdateRow();

  const handleUpdate = async (event) => {
    event.preventDefault();
    await updateRow(room.id, { 
      name: name,
      schoolYear: schoolYear 
    });
    onUpdated();
    setOpenEditForm(false);
  };

  const editForm = (
    <Modal
      open={openEditForm}
      onClose={() => setOpenEditForm(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form className={classes.modal} onSubmit={handleUpdate}>
        <Typography variant="h6">Edit Kelas</Typography>
        <TextField
          variant="outlined"
          placeholder="Edit Nama Kelas"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "20px 0 20px 0" }}
        ></TextField>
        <TextField
          variant="outlined"
          placeholder="Tahun ajaran"
          fullWidth
          value={schoolYear}
          onChange={(e) => setSchoolYear(e.target.value)}
          style={{ margin: "20px 0 20px 0" }}
        ></TextField>

        <ButtonGroup style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="text"
            color="primary"
            onClick={() => setOpenEditForm(false)}
          >
            Batal
          </Button>
          <Button style={{ color: "GrayText" }} variant="text" type="submit">
            Simpan Perubahan
          </Button>
        </ButtonGroup>
      </form>
    </Modal>
  );

  return (
    <header
      style={{
        backgroundColor: "#4267E9",
        color: "white",
        padding: "1em 0 4em 0",
      }}
    >
      <Container maxWidth="lg">
        <ButtonGroup
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2em",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Button
              startIcon={<ArrowBack />}
              size="small"
              variant="text"
              color="inherit"
            >
              Kembali ke Daftar Kelas
            </Button>
          </Link>
          <Button
            startIcon={<Settings />}
            size="small"
            variant="text"
            color="inherit"
            onClick={() => setOpenEditForm(true)}
          >
            Edit Kelas
          </Button>
          {editForm}
        </ButtonGroup>
        <div style={{ paddingTop: 10 }}>
          <Typography variant="h4">{room.name}</Typography>
        </div>
        <div style={{ marginTop: 15 }}>
          <Typography>Tahun Ajaran: {room.schoolYear}</Typography>
          <Typography>Kode Kelas: {room.inviteCode}</Typography>
        </div>
      </Container>
    </header>
  );
};

export default RoomHeader;
