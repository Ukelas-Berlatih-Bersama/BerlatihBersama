import React, { useState, useEffect } from "react";
import {
  Avatar,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Modal,
  TextField,
  ButtonGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import qoreContext from "../../qoreContext";
import { SettingsRounded, ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

function getModalStyle() {
  return {
    margin: "0 -50% 0 100%",
  };
}

const useStyles = makeStyles((theme) => ({
  large: {
    width: "5em",
    height: "5em",
    marginRight: "20px",
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "2px solid blue",
    // boxShadow: "2px",
    padding: "25px",
  },
}));

export default function Profile() {
  const { user, status } = qoreContext.useCurrentUser();
  // console.log(user, ">>> profile data");
  // console.log(status, ">>> status");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modalStyle] = React.useState(getModalStyle);
  const history = useHistory();

  useEffect(() => {
    setName("");
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    // e.preventDefault();
    setOpen(false);
  };

  const handleBackClass = (e) => {
    history.push("/");
  };

  const { updateRow } = qoreContext.view("allMember").useUpdateRow();
  // console.log(user.data.id, ">> id");
  // console.log(status, ">>> status");

  async function EditProfile(e) {
    e.preventDefault();
    await updateRow(user.data.id, { nama: name, email: email }).then(
      handleClose
    );
    window.location.reload();
  }

  return (
    <>
      {status == "success" ? (
        <div>
          <main style={{ flexGrow: 1, padding: 20 }}>
            <Container>
              <Paper
                elevation={0}
                style={{
                  margin: "0 150px 20px 150px",
                  // padding: "10px",
                }}
              >
                <Button
                  startIcon={<ArrowBack />}
                  size="small"
                  variant="text"
                  color="primary"
                  onClick={handleBackClass}
                >
                  Kembali ke Halaman Utama
                </Button>
              </Paper>
              <Paper
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // padding: "20px 20px 20px 20px",
                  margin: "20px 150px 20px 150px",
                  padding: "10px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Avatar
                    className={classes.large}
                    style={{ backgroundColor: "purple" }}
                  ></Avatar>
                </div>
                <Button
                  startIcon={<SettingsRounded />}
                  variant="text"
                  size="small"
                  color="primary"
                  onClick={handleOpen}
                >
                  Edit Profil
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  className={classes.modal}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                  }}
                >
                  <form
                    onSubmit={EditProfile}
                    className={classes.modal}
                    style={modalStyle}
                  >
                    <Typography variant="h6">Edit Profil</Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="name"
                      label="Nama Baru"
                      name="name"
                      defaultValue={user.data.nama}
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ margin: "20px 0 20px 0" }}
                    ></TextField>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="email"
                      label="Email Baru"
                      name="email"
                      defaultValue={user.email}
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ margin: "20px 0 20px 0" }}
                    ></TextField>
                    <ButtonGroup
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant="text"
                        color="primary"
                        onClick={handleClose}
                      >
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
              </Paper>
              <Paper
                style={{
                  margin: "20px 150px 20px 150px",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    borderBottom: "1px solid rgba(171, 183, 183, 1)",
                    padding: "10px 0 10px 0",
                  }}
                >
                  <Typography variant="h4" style={{ fontWeight: "bold" }}>
                    Tentang
                  </Typography>
                </div>
                <div style={{ marginTop: 15 }}>
                  <div style={{ display: "flex" }}>
                    <Typography style={{ color: "GrayText" }}>
                      Email:{" "}
                    </Typography>
                    <Typography
                      style={{ marginLeft: "4px", fontWeight: "bold" }}
                    >
                      {user.email}
                    </Typography>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Typography style={{ color: "GrayText" }}>
                      Nama:{" "}
                    </Typography>
                    <Typography
                      style={{ marginLeft: "4px", fontWeight: "bold" }}
                    >
                      {user.data.nama}
                    </Typography>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Typography style={{ color: "GrayText" }}>
                      Role:{" "}
                    </Typography>
                    <Typography
                      style={{ marginLeft: "4px", fontWeight: "bold" }}
                    >
                      {user.data.role.displayField}
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Container>
          </main>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}
