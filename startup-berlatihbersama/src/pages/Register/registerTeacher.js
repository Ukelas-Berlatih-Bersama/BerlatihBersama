import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { register_guru } from "../../store/actions/actionUser";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import RegisterNavbar from "./RegisterNavbar";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function Register() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  function handleRegister(event) {
    event.preventDefault();
    let payload = {
      email,
      password,
      nama,
      alamat: address,
      gender,
      time: selectedDate,
    };
    dispatch(register_guru(payload));
    history.push("/");
  }

  const handleChangeDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <RegisterNavbar />
      <Box display="flex" justifyContent="center" style={{ marginTop: "2rem" }}>
        <Typography component="h1" variant="h4">
          Lengkapi data diri Anda sebagai Guru
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" style={{ marginTop: "1rem" }}>
        <Typography style={{ fontSize: ".8rem", color: "#6B7380" }}>
          Mulai daftarkan akun untuk mengelola kelas, materi dan tugas
        </Typography>
      </Box>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <form onSubmit={handleRegister} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                Nama Lengkap
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="nama"
                  label="Masukkan nama lengkap Anda disini"
                  name="nama"
                  autoComplete="nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                Jenis Kelamin
                <RadioGroup row aria-label="gender" name="gender">
                  <FormControlLabel
                    value="male"
                    control={<Radio color="primary" />}
                    label="Laki - laki"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio color="primary" />}
                    label="Perempuan"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </RadioGroup>
              </Grid>

              <Grid item xs={12}>
                Tanggal Lahir
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    value={selectedDate}
                    onChange={handleChangeDate}
                    label="Tanggal Lahir"
                    showTodayButton
                    inputVariant="outlined"
                    id="time"
                    name="time"
                    fullWidth
                    style={{ marginTop: 10 }}
                  ></KeyboardDatePicker>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                Alamat
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="alamat"
                  label="Alamat Tempat Tinggal"
                  name="alamat"
                  // autoComplete="alamat"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                Email
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                Password
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            {/* <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Login here
                </Link>
              </Grid>
            </Grid> */}
            <Typography
              style={{
                fontSize: ".7rem",
                color: "#6B7380",
                marginTop: "3em",
                display: "flex",
                justifyContent: "center",
              }}
            >
              2020 © Berlatihbersama. All rights reserved.
            </Typography>
          </form>
        </div>
      </Container>
    </>
  );
}
