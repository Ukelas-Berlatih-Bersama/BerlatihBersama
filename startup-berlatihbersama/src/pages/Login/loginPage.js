import React, { useState } from "react";
import {
  AppBar,
  Button,
  TextField,
  Container,
  Typography,
  makeStyles,
  Box,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/actionUser";

import Logo from "../../image/brand-logo.svg";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: "16px 0",
    boxShadow: "none",
    backgroundColor: "#2950D8"
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const dispatch = useDispatch();

  const handleClickShowPassword = () =>
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // auth state from redux
  const auth = useSelector((state) => state.reducerLogin);

  const handleLogin = (event) => {
    event.preventDefault();

    let payload = {
      email: email,
      password: values,
    };
    dispatch(login(payload));
    console.dir(auth);
  };

  return (
    <>
      {auth.isLogin ? <Redirect to="/" /> : null}
      <AppBar position="static" style={{boxShadow: "0px 4px 10px rgba(107, 115, 128, 0.07)", backgroundColor: "white"}}>
      <Container maxWidth="lg" >
        <Box display="flex" justifyContent="space-between" py={1}>
          <Box p={1} width="100%">
            <Link to={"/"}>
              <img alt="edit" src={Logo} />
            </Link>
          </Box>
          <Box p={1} flexShrink={0}>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                color="primary"
                width={200}
                style={{ textTransform: "none" }}
              >
                Buat Akun Baru
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
      </AppBar>
      <Box display="flex" justifyContent="center" style={{ marginTop: "5rem" }}>
        <Typography component="h1" variant="h4">
          Selamat datang di Ukelas
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography component="h1" variant="h4">
          Silahkan masuk dengan akun Anda
        </Typography>
      </Box>
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          {auth.error ? <Alert severity="error" style={{marginBottom:28}}>{auth.message}</Alert>:null}
          <form onSubmit={handleLogin} className={classes.form}>
            <label>Email</label>
            <TextField
              variant="outlined"
              margin="normal"
              style={{marginBottom: 28}}
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Masukkan email Anda disini"
            />
            <label>Password</label>
            <TextField
              variant="outlined"
              margin="normal"
              style={{marginBottom: 28}}
              required
              fullWidth
              name="password"
              type={values.showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={(e) => setValues(e.target.value)}
              value={values.password}
              placeholder="Masukkan password Anda disini"
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ textTransform: "none", fontSize: 18 }}
            >
              Masuk
            </Button>
          </form>
          <Typography
            style={{ fontSize: ".7rem", color: "#6B7380", marginTop: "3em" }}
          >
            2020 © Berlatihbersama. All rights reserved.
          </Typography>
        </div>
      </Container>
    </>
  );
}
