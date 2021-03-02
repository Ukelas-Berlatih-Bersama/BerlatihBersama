import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  Box,
} from "@material-ui/core";
import qoreContext from "../../qoreContext";
import { useParams, useHistory } from "react-router-dom";
import CardSubject from "../../components/cardSubject";
import Navbar from "../../components/Navbar";
import Moment from "react-moment";
import { ArrowBack, Settings, AccountCircle } from "@material-ui/icons";

function getModalStyle() {
  return {
    margin: "-5% 10px",
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 7em 0em 7em",
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid blue",
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
  },
  mod: {
    display: "flex",
  },
  gray: {
    display: "flex",
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

export default function InsideClassroom() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [buka, setBuka] = React.useState(false);
  const [edit, setEdit] = useState("");
  const { someClassroomId } = useParams();
  const [subj, setSubj] = useState("");
  const history = useHistory();
  const [toogle, setToogle] = React.useState(0);
  const [modalStyle] = React.useState(getModalStyle);

  // console.log(toogle, ">>> toog");

  const { data: classroom, status } = qoreContext
    .view("allClassroom")
    .useGetRow(someClassroomId);
  console.log(JSON.stringify(classroom, null, 2), ">>> user");
  // console.log(someClassroomId, ">>> id");

  const { insertRow } = qoreContext.view("allSubject").useInsertRow();
  // console.log(insertRow, "<<< send");

  const { addRelation, removeRelation, statuses, errors } = qoreContext
    .view("allClassroom")
    .useRelation(someClassroomId);

  const { updateRow } = qoreContext.view("allClassroom").useUpdateRow();
  // console.log(updateRow, "<<< update");

  async function addSubject(e) {
    e.preventDefault();
    await insertRow({
      name: subj,
    }).then((data) => {
      // console.log(data.id, ">>>>data id");
      let idSub = data.id;
      return addSubjectRelation({ e, idSub });
    });
  }

  async function addSubjectRelation({ e, idSub }) {
    e.preventDefault();
    await addRelation({
      subject: [idSub],
    });
    window.location.reload();
  }

  async function handleEditClass(e) {
    e.preventDefault();
    await updateRow(someClassroomId, {
      name: edit,
    }).then(handleTutup);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleBuka = () => {
    setBuka(true);
  };

  const handleTutup = (e) => {
    setBuka(false);
  };

  const handleBackClass = (e) => {
    history.push("/");
  };

  const handleSwitch = (e, newValue) => {
    setToogle(newValue);
  };

  const body = (
    <form onSubmit={addSubject} className={classes.modal} style={modalStyle}>
      <Typography variant="h6">Buat Mata Pelajaran</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        id="name"
        label="Masukkan Nama Mata Pelajaran"
        name="name"
        fullWidth
        value={subj}
        onChange={(e) => setSubj(e.target.value)}
        style={{ margin: "20px 0 20px 0" }}
      ></TextField>
      <ButtonGroup style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="text"
          style={{ color: "GrayText" }}
          onClick={handleClose}
        >
          Batal
        </Button>
        <Button color="primary" variant="text" type="submit">
          Buat Mata Pelajaran
        </Button>
      </ButtonGroup>
    </form>
  );

  return (
    <>
      {status == "success" ? (
        <div>
          <Navbar />
          <main style={{ flexGrow: 1, padding: 30 }}>
            <Container className={classes.container}>
              <ButtonGroup
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  startIcon={<ArrowBack />}
                  size="small"
                  variant="text"
                  color="primary"
                  onClick={handleBackClass}
                >
                  Kembali ke Daftar Kelas
                </Button>
                <Button
                  startIcon={<Settings />}
                  size="small"
                  variant="text"
                  color="primary"
                  onClick={handleBuka}
                >
                  Edit Kelas
                </Button>
                <Modal
                  open={buka}
                  onClose={handleTutup}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <form onSubmit={handleEditClass} className={classes.modal}>
                    <Typography variant="h6">Edit Kelas</Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="name"
                      label="Edit Nama Kelas"
                      name="name"
                      fullWidth
                      value={edit}
                      onChange={(e) => setEdit(e.target.value)}
                      style={{ margin: "20px 0 20px 0" }}
                    ></TextField>
                    <ButtonGroup
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant="text"
                        color="primary"
                        onClick={handleTutup}
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
              </ButtonGroup>
              <div style={{ paddingTop: 10 }}>
                <Typography variant="h4">{classroom.name}</Typography>
              </div>
              <div style={{ marginTop: 15 }}>
                <Typography style={{ color: "#6B7380" }}>
                  Kode Kelas:{" "}
                </Typography>
                <div className={classes.gray}>
                  <Typography style={{ color: "#6B7380" }}>
                    Tanggal Pembuatan Kelas:
                  </Typography>
                  <Typography style={{ paddingLeft: 5 }}>
                    <Moment format="D MMM YYYY">{classroom.time}</Moment>
                  </Typography>
                </div>
              </div>
              <Grid className={classes.root}>
                <Tabs
                  value={toogle}
                  onChange={handleSwitch}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab style={{ width: 400 }} label="Mata Pelajaran" />
                  <Tab style={{ width: 400 }} label="Siswa" />
                </Tabs>
              </Grid>

              <div className={classes.add}>
                <Typography variant="h6">
                  Semua Mata Pelajaran ({classroom.subject.totalCount})
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Tambah Mata Pelajaran Baru
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {body}
                </Modal>
              </div>
              <div className={classes.mod}>
                {toogle == 0 ? (
                  classroom.subject.nodes.map((node, i) => {
                    // console.log(node, ">>>> node");
                    return (
                      <Grid item xs={3} key={i}>
                        <CardSubject node={node} key={i} />
                      </Grid>
                    );
                  })
                ) : (
                  <Container>
                    <Grid item xs={12}>
                      <Paper
                        style={{
                          padding: "10px",
                        }}
                        elevation={0}
                      >
                        <div
                          style={{
                            borderBottom: "1px solid rgba(171, 183, 183, 1)",
                            padding: "10px 0 10px 0",
                          }}
                        >
                          <Typography
                            variant="body1"
                            style={{ fontWeight: "bold" }}
                          >
                            Guru ({classroom.teacher.totalCount})
                          </Typography>
                        </div>
                        {classroom.teacher.nodes.map((nod, i) => {
                          // console.log(nod, ">>> nod");
                          return (
                            <div
                              style={{
                                display: "flex",
                                marginTop: 10,
                                color: "#424242",
                              }}
                            >
                              <AccountCircle />
                              <Typography style={{ marginLeft: 5 }}>
                                {nod.displayField}
                              </Typography>
                            </div>
                          );
                        })}
                      </Paper>
                      <Paper
                        style={{
                          padding: "10px",
                        }}
                        elevation={0}
                      >
                        <div
                          style={{
                            borderBottom: "1px solid rgba(171, 183, 183, 1)",
                            padding: "10px 0 10px 0",
                          }}
                        >
                          <Typography
                            variant="body1"
                            style={{ fontWeight: "bold" }}
                          >
                            Siswa ({classroom.siswa.totalCount})
                          </Typography>
                        </div>
                        {classroom.siswa.nodes.map((nod, i) => {
                          // console.log(nod, ">>> nod");
                          return (
                            <div
                              style={{
                                display: "flex",
                                marginTop: 10,
                                color: "#424242",
                              }}
                            >
                              <AccountCircle />
                              <Typography style={{ marginLeft: 5 }}>
                                {nod.displayField}
                              </Typography>
                            </div>
                          );
                        })}
                      </Paper>
                    </Grid>
                  </Container>
                )}
              </div>
            </Container>
          </main>
        </div>
      ) : null}
    </>
  );
}
