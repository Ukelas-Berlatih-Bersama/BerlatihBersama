import React, { useState, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "../../components/sidebar";
import { TextField, Typography, Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import qoreContext from "../../qoreContext";

const useStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

export default function NewClass() {
  const classes = useStyle();
  const [room_name, setRoom_name] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setRoom_name("");
    setSubject("");
    setDescription("");
    setSelectedDate(new Date());
  }, []);

  const handleChangeDate = (date) => {
    setSelectedDate(date);
  };

  const { send, status } = qoreContext
    .view("allClassroom")
    .useForm("addNewClass");

  async function addNewClass(e) {
    e.preventDefault();
    await send({
      name: room_name,
      description: description,
      time: selectedDate,
    })
      .then((data) => {
        console.log(data, ">>> data new class");
      })
      .catch((error) => {
        console.log(error, ">>> error submit class new");
      });
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <main style={{ flexGrow: 1, padding: 30 }}>
        <div className={classes.toolbar}>
          <Typography component="h1" variant="h5">
            Tambah Kelas Baru
          </Typography>
          <form onSubmit={addNewClass} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nama Kelas"
              name="name"
              autoComplete="name"
              autoFocus
              value={room_name}
              onChange={(e) => setRoom_name(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="desctiption"
              label="Deskripsi"
              name="description"
              autoComplete="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              // onClick={() => addNewClass()}
            >
              Tambah Kelas Baru
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
