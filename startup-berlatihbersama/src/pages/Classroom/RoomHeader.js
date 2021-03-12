import {
  TextField,
  Typography,
  Button,
  Modal,
  Grid,
  Container,
  ButtonGroup,
  Tabs,
  Tab,
  Paper,
} from "@material-ui/core";
import { ArrowBack, Settings, AccountCircle } from "@material-ui/icons";
import { Link, useParams, useHistory } from "react-router-dom";

const RoomHeader = ({ room }) => {
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
            // onClick={handleBuka}
          >
            Edit Kelas
          </Button>
          <Modal
            // open={buka}
            // onClose={handleTutup}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form>
              <Typography variant="h6">Edit Kelas</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                id="name"
                label="Edit Nama Kelas"
                name="name"
                fullWidth
                value={"edit"}
                // onChange={(e) => setEdit(e.target.value)}
                style={{ margin: "20px 0 20px 0" }}
              ></TextField>
              <ButtonGroup
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button variant="text" color="primary">
                  Batal
                </Button>
                <Button
                  style={{ color: "GrayText" }}
                  variant="text"
                  type="submit"
                >
                  Simpan Perubahan
                </Button>
              </ButtonGroup>
            </form>
          </Modal>
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
