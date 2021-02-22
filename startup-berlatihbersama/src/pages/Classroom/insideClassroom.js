import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Modal } from "@material-ui/core";
import Sidebar from "../../components/sidebar";
import qoreContext from "../../qoreContext";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  modal: {
    display: "flex",
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function InsideClassroom() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const [subject, setSubject] = useState("");

  const { data: classroom, status } = qoreContext
    .view("allClassroom")
    .useGetRow(id);
  console.log(JSON.stringify(classroom, null, 2), ">>> user");
  // console.log(status, "status");

  // const { insertRow } = qoreContext.view("allSubject").useInsertRow();
  // console.log(insertRow, ">>>> insertROw");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { send } = qoreContext.view("allSubject").useForm("addNewSubject");

  async function addSubject(e) {
    e.preventDefault();
    await send({
      name: subject,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const body = (
    <form onSubmit={addSubject} className={classes.modal}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        id="name"
        label="Nama Mata Pelajaran"
        name="name"
        autoComplete="name"
        value={subject}
        autoFocus
        onChange={(e) => setSubject(e.target.value)}
      ></TextField>
      <div style={{ display: "table-row" }}>
        <Button type="submit" color="primary">
          Tambah
        </Button>
        <Button color="secondary" onClick={handleClose}>
          Batal
        </Button>
      </div>
    </form>
  );

  return (
    <div className={classes.root}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: 30 }}>
        <div>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Tambah Mata Pelajaran Baru
          </Button>
          <Modal open={open} onClose={handleClose}>
            {body}
          </Modal>
        </div>
        <div>
          {status == "success" && (
            // classroom.subject.nodes.map((node, i) => {
            //   const sub = node.displayField
            <ul>
              <li>{classroom.subject.displayField}</li>
            </ul>
            // })
          )}
        </div>
      </main>
    </div>
  );
}
