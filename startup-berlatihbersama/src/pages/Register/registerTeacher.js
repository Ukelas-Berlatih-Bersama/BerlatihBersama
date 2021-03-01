import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { register_guru } from "../../store/actions/actionUser";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import qoreContext from "../../qoreContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const svgIcon = (
  <Icon>
    <img alt="edit" src="https://i.imgur.com/XPmFXHy.png" />
  </Icon>
);
export default function Register() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  function handleRegister(event) {
    event.preventDefault();
    let payload = {
      email,
      password,
    };
    dispatch(register_guru(payload));
    history.push("/");
  }

  return (
    <div>
      <Box display="flex" p={1} bgcolor="background.paper" style={{margin: '0 3em'}}>
        <Box p={1} width="100%" >
          {svgIcon}
        </Box>
        <Box p={1} flexShrink={0}>
          Sudah punya akun? 
          <Link to="/login" style={{textDecoration: 'none'}}>
            Masuk Sekarang
          </Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" style={{marginTop: '5rem'}}>
        <Typography  component="h1" variant="h4">
          Lengkapi data diri Anda sebagai Guru
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" style={{marginTop: '1rem'}}>
        <Typography style={{fontSize: '.8rem', color: '#6B7380'}}>
          Mulai daftarkan akun untuk mengelola kelas, materi dan tugas
        </Typography>
      </Box>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <form onSubmit={handleRegister} className={classes.form} noValidate>
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
                  // value={nama}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                Jenis Kelamin
                <RadioGroup row aria-label="gender" name="gender1">
                  <FormControlLabel value="female" control={<Radio color="primary" />} label="Laki - laki" />
                  <FormControlLabel value="male" control={<Radio color="primary" />} label="Perempuan" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
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
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Login here
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
