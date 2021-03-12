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
} from "@material-ui/core";
import qoreContext from "../../qoreContext";
import { useParams, useHistory } from "react-router-dom";
import CardSubject from "../../components/cardSubject";
import { AccountCircle } from "@material-ui/icons";
import RoomHeader from "./RoomHeader";
// import EmptyClassroom from "../../components/emptyChalkboard";

function getModalStyle() {
  return {
    margin: "-5% 10px",
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 500,
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
  const [, setBuka] = React.useState(false);
  const [edit] = useState("");
  const { someClassroomId } = useParams();
  const [subj, setSubj] = useState("");
  const history = useHistory();
  const [toogle, setToogle] = React.useState(0);
  const [modalStyle] = React.useState(getModalStyle);

  const { data: classroom, status, revalidate: roomRevalidate } = qoreContext
    .view("allClassroom")
    .useGetRow(someClassroomId);

  const { data: subjects, revalidate: subjectRevalidate } = qoreContext
    .view("classroomSubject")
    .useListRow(
      {
        roomId: someClassroomId,
      },
      { networkPolicy: "cache-only" }
    );

  const { insertRow } = qoreContext.view("allSubject").useInsertRow();

  const { addRelation } = qoreContext
    .view("allClassroom")
    .useRelation(someClassroomId);

  const { updateRow } = qoreContext.view("allClassroom").useUpdateRow();

  async function addSubject(e) {
    e.preventDefault();
    await insertRow({
      name: subj,
    }).then((data) => {
      let idSub = data.id;
      return addSubjectRelation({ e, idSub });
    });
  }

  async function addSubjectRelation({ e, idSub }) {
    e.preventDefault();
    await addRelation({
      subject: [idSub],
    });
    subjectRevalidate();
    setOpen(false);
    // window.location.reload();
  }


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };


  const handleTutup = () => {
    setBuka(false);
  };


  const handleSwitch = (e, newValue) => {
    setToogle(newValue);
  };

  const body = (
    <form onSubmit={addSubject} className={classes.modal} style={modalStyle}>
      <Typography variant="h6" style={{ marginBottom: 10 }}>
        Buat Mata Pelajaran
      </Typography>
      <Typography variant="content">Nama Mata Pelajaran</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        id="name"
        placeholder="Masukan Nama Mata Pelajaran"
        name="name"
        fullWidth
        value={subj}
        onChange={(e) => setSubj(e.target.value)}
        style={{ margin: "8px 0 20px 0" }}
      ></TextField>
      <ButtonGroup style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="text"
          style={{ color: "GrayText", paddingRight: 30 }}
          onClick={handleClose}
          size="small"
        >
          Batal
        </Button>
        <Button color="primary" variant="text" size="small" type="submit">
          Buat Mata Pelajaran
        </Button>
      </ButtonGroup>
    </form>
  );

  return (
    <>
      {status == "success" ? (
        <>
          <RoomHeader room={classroom} onUpdated={roomRevalidate} />
          <main style={{ flexGrow: 1 }}>
            <Container maxWidth="lg">
              <Tabs
                value={toogle}
                onChange={handleSwitch}
                indicatorColor="primary"
                textColor="primary"
                centered
                variant="fullWidth"
              >
                <Tab style={{ width: "100%" }} label="Mata Pelajaran" />
                <Tab style={{ width: "100%" }} label="Anggota Kelas" />
              </Tabs>

              <div>
                {toogle == 0 ? (
                  <>
                    <div className={classes.add}>
                      <Typography variant="h6">
                        Semua Mata Pelajaran ({subjects.length})
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
                    <Grid container spacing={2}>
                      {subjects.map((subject) => {
                        return (
                          <Grid item sm={12} lg={3}>
                            <CardSubject
                              subject={subject}
                              onUpdated={subjectRevalidate}
                              key={subject.id}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </>
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
                        {classroom.teacher.nodes.map((nod) => {
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
                            Siswa ({classroom.student.totalCount})
                          </Typography>
                        </div>
                        {classroom.student.nodes.map((nod) => {
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
        </>
      ) : null}
    </>
  );
}
