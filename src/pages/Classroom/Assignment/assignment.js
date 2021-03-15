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
  Input,
  Tabs,
  Tab,
  InputAdornment,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { ArrowBack, Settings, Search } from "@material-ui/icons";
import qoreContext, { client } from "../../../qoreContext";
import CardAssignment from "../../../components/cardAssignment";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 5em 0em 5em",
  },
  modal: {
    // display: "flex",
    // position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid blue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mod: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
  },
  add: {
    display: "flex",
    margin: "25px 0 10px 0",
    justifyContent: "space-between",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Module() {
  const classes = useStyles();
  const { assignmentId } = useParams();
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [buka, setBuka] = React.useState(false);
  const [edit, setEdit] = useState("");
  const [judul, setJudul] = useState("");
  const [toogle, setToogle] = React.useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: materi, status, error } = qoreContext
    .view("allModule")
    .useGetRow(assignmentId);
  //   console.log(JSON.stringify(materi, null, 2), ">>> materi");
  //   console.log(status, "status>>>");

  const { insertRow } = qoreContext.view("allAssignment").useInsertRow();
  //   console.log(insertRow, ">>> insert");

  const { addRelation, removeRelation, statuses, errors } = qoreContext
    .view("allModule")
    .useRelation(assignmentId);
  //   console.log(addRelation, ">>> addRelation");

  const { updateRow } = qoreContext.view("allModule").useUpdateRow();
  // console.log(updateRow, ">>> update");

  const handleUpload = async (event) => {
    const file = event.currentTarget.files?.item(0);
    if (!file) return;
    const url = await client.view("allAssignment").upload(file);
    setImage(url);
  };

  async function addAssignment(e) {
    e.preventDefault();
    await insertRow({
      name: judul,
      description: desc,
      deadline: selectedDate,
      image: image,
    }).then((data) => {
      //   console.log(data.id, ">>> data");
      let idMod = data.id;
      return addAssignmentRelation({ e, idMod });
    });
  }

  async function addAssignmentRelation({ e, idMod }) {
    e.preventDefault();
    await addRelation({
      assignment: [idMod],
    }).then(handleClose);
    window.location.reload();
  }

  async function handleEditModule(e) {
    e.preventDefault();
    await updateRow(assignmentId, {
      title: edit,
    }).then(handleTutup);
  }

  const handleChangeDate = (date) => {
    setSelectedDate(date);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    // e.preventDefault();
    setOpen(false);
  };

  const handleBuka = () => {
    setBuka(true);
  };

  const handleTutup = (e) => {
    setBuka(false);
  };

  const handleSwitch = (e, newValue) => {
    setToogle(newValue);
  };

  const body = (
    <form onSubmit={addAssignment} className={classes.modal}>
      <Typography variant="h6" style={{ fontWeight: "bold" }}>
        Tambah Tugas
      </Typography>
      <div>
        <Typography variant="subtitle1" style={{ margin: "10px 0 -10px 0" }}>
          Judul
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="judul"
          label="Judul Tugas"
          name="judul"
          value={judul}
          fullWidth
          autoFocus
          onChange={(e) => setJudul(e.target.value)}
        ></TextField>
      </div>
      <div>
        <Typography variant="subtitle1" style={{ margin: "10px 0 -10px 0" }}>
          Isi Tugas
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="description"
          label="Isi Tugas"
          name="description"
          fullWidth
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></TextField>
      </div>
      <div>
        <Typography variant="subtitle1" style={{ margin: "10px 0 -10px 0" }}>
          Deadline
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            value={selectedDate}
            onChange={handleChangeDate}
            label="Tanggal dan waktu"
            showTodayButton
            inputVariant="outlined"
            id="time"
            name="time"
            fullWidth
            style={{ marginTop: 15 }}
          ></KeyboardDateTimePicker>
        </MuiPickersUtilsProvider>
      </div>
      <div style={{ display: "flex", marginBottom: 1, marginTop: 20 }}>
        <Typography style={{ marginRight: 5 }}>Upload Foto</Typography>
        <Typography style={{ color: "GrayText" }}>(Optional)</Typography>
      </div>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <Input type="file" onChange={handleUpload} fullWidth></Input>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 20,
        }}
      >
        <Button style={{ color: "GrayText" }} onClick={handleClose}>
          Tutup
        </Button>
        <Button color="primary" type="submit">
          Tambah Tugas
        </Button>
      </div>
    </form>
  );

  return (
    <>
      {status == "success" ? (
        <div>
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
                  onClick={handleGoBack}
                >
                  Kembali ke Daftar Materi
                </Button>
                <Button
                  startIcon={<Settings />}
                  size="small"
                  variant="text"
                  color="primary"
                  onClick={handleBuka}
                >
                  Edit Materi
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
                  <form onSubmit={handleEditModule} className={classes.modal}>
                    <Typography variant="h6">Edit Materi</Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="name"
                      label="Edit Materi"
                      name="name"
                      // required
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
              <div>
                <Typography variant="h4" style={{ padding: 10 }}>
                  {materi.title}
                </Typography>
              </div>
              <Grid className={classes.root}>
                <Tabs
                  value={toogle}
                  onChange={handleSwitch}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Tugas" style={{ width: 400 }} />
                </Tabs>
              </Grid>
              <div>
                <div className={classes.add}>
                  <Typography variant="h6">
                    Semua Tugas ({materi.assignment.totalCount})
                  </Typography>
                  <TextField
                    label="Cari tugas"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                    style={{ width: "15%" }}
                  >
                    Tambah Tugas
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
                  <Grid container>
                    {materi.assignment.nodes
                      .filter((node) =>
                        node.displayField
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((node, idx) => {
                        // const sub = node.displayField;
                        return (
                          <Grid container direction="column">
                            <CardAssignment node={node} key={idx} />
                          </Grid>
                        );
                      })}
                  </Grid>
                </div>
              </div>
            </Container>
          </main>
        </div>
      ) : null}
    </>
  );
}
