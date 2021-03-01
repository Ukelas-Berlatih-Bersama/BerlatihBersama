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
  IconButton,
  Paper,
} from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import {
  ArrowBack,
  Settings,
  FiberManualRecord,
  Search,
  ArrowRight,
} from "@material-ui/icons";
import qoreContext, { client } from "../../../qoreContext";
import Navbar from "../../../components/Navbar/Navbar";
import CardMateri from "../../../components/cardMateri";
import { id } from "date-fns/locale";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 7em 0em 7em",
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
  const { subjectId } = useParams();
  const [open, setOpen] = React.useState(false);
  const [materi, setMateri] = useState("");
  const [desc, setDesc] = useState("");
  const [video, setVideo] = useState("");
  const [image, setImage] = useState("");
  const [buka, setBuka] = React.useState(false);
  const [edit, setEdit] = useState("");
  const [toogle, setToogle] = React.useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: subject, status, error } = qoreContext
    .view("allSubject")
    .useGetRow(subjectId);
  // console.log(subject, ">>> subj");
  //   console.log(status, "status>>>");

  const { insertRow } = qoreContext.view("allModule").useInsertRow();
  //   console.log(insertRow, ">>> insert");

  const { addRelation, removeRelation, statuses, errors } = qoreContext
    .view("allSubject")
    .useRelation(subjectId);

  const { updateRow } = qoreContext.view("allSubject").useUpdateRow();
  // console.log(updateRow, ">>> update");

  const handleUpload = async (event) => {
    const file = event.currentTarget.files?.item(0);
    if (!file) return;
    const url = await client.view("allModule").upload(file);
    setImage(url);
  };

  async function addModule(e) {
    e.preventDefault();
    await insertRow({
      title: materi,
      description: desc,
      url: video,
      image: image,
    }).then((data) => {
      console.log(data.id, ">>> data");
      let idMod = data.id;
      return addModuleRelation({ e, idMod });
    });
  }

  async function addModuleRelation({ e, idMod }) {
    e.preventDefault();
    await addRelation({
      module: [idMod],
    }).then(handleClose);
    window.location.reload();
  }

  async function handleEditModule(e) {
    e.preventDefault();
    await updateRow(subjectId, {
      name: edit,
    }).then(handleTutup);
  }

  const handleGoBack = () => {
    window.history.back();
  };

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

  const handleSwitch = (e, newValue) => {
    setToogle(newValue);
  };

  const body = (
    <form onSubmit={addModule} className={classes.modal}>
      <Typography variant="h6">Tambah Materi</Typography>
      <div style={{ marginTop: 15 }}>
        <Typography style={{ marginBottom: -10 }}>Judul</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="judul"
          label="judul"
          name="judul"
          autoComplete="judul"
          fullWidth
          value={materi}
          onChange={(e) => setMateri(e.target.value)}
        ></TextField>
      </div>
      <div style={{ margin: "15px 0 15px 0" }}>
        <div style={{ display: "flex", marginBottom: -10 }}>
          <Typography style={{ marginRight: 5 }}>Deskripsi</Typography>
          <Typography style={{ color: "GrayText" }}>(Optional)</Typography>
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="description"
          label="Deskripsi"
          name="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></TextField>
      </div>
      <div style={{ marginBottom: 5 }}>
        <div style={{ display: "flex", marginBottom: -10 }}>
          <Typography style={{ marginRight: 5 }}>URL Video/Youtube</Typography>
          <Typography style={{ color: "GrayText" }}>(Optional)</Typography>
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          id="video"
          label="Optional"
          name="video"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        ></TextField>
      </div>
      <div style={{ display: "flex", marginBottom: 1 }}>
        <Typography style={{ marginRight: 5 }}>Upload Foto</Typography>
        <Typography style={{ color: "GrayText" }}>(Optional)</Typography>
      </div>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <Input type="file" onChange={handleUpload}></Input>
      </div>
      <ButtonGroup style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="text" size="small" color="primary" type="submit">
          Tambah
        </Button>
        <Button
          variant="text"
          size="small"
          color="secondary"
          onClick={handleClose}
        >
          Tutup
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
                  onClick={handleGoBack}
                >
                  Kembali ke Daftar Mata Pelajaran
                </Button>
                <Button
                  startIcon={<Settings />}
                  size="small"
                  variant="text"
                  color="primary"
                  onClick={handleBuka}
                >
                  Edit Mata Pelajaran
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
                    <Typography variant="h6">Edit Mata Pelajaran</Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="name"
                      label="Edit Nama Mata Pelajaran"
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
                {subject.classroom.nodes.map((node, i) => {
                  return (
                    <Typography key={i} variant="h4" style={{ padding: 10 }}>
                      {node.displayField} / {subject.name}
                    </Typography>
                  );
                })}
              </div>
              <Grid className={classes.root}>
                <Tabs
                  value={toogle}
                  onChange={handleSwitch}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Materi" style={{ width: 400 }} />
                </Tabs>
              </Grid>
              <div>
                <div className={classes.add}>
                  <Typography variant="h6">
                    Semua Materi ({subject.module.totalCount})
                  </Typography>
                  <TextField
                    label="Cari materi"
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
                    style={{ width: 200 }}
                  >
                    Tambah Materi
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
                    {subject.module.nodes
                      .filter((node) =>
                        node.displayField
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((node, idx) => {
                        // const sub = node.displayField;
                        return (
                          <Grid container direction="column">
                            <CardMateri node={node} key={idx} />
                          </Grid>
                        );
                      })}
                  </Grid>
                </div>
                <div></div>
              </div>
            </Container>
          </main>
        </div>
      ) : null}
    </>
  );
}
