import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Container,
  Typography,
  makeStyles,
  Box,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import Icon from "@material-ui/core/Icon";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/actionUser";
import qoreContext from "../../qoreContext";
import { QoreProject } from "@feedloop/qore-client";

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
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setValues({
    ...values,
    showPassword: !values.showPassword
  });
  const handleMouseDownPassword = (event) => {event.preventDefault();};

  // const member = qoreContext.view("allMember").useListRow();
  // const firstMember = member.data.email;

  // console.log(member, ">>> member");

  const isLogin = useSelector((state) => state.reducerLogin.isLogin);

  function handleLogin(event) {
    event.preventDefault();
    let payload = {
      email,
      values,
    };
    dispatch(login(payload));
  }
  const svgIcon = (
    <Icon>
      <img alt="edit" src="https://i.imgur.com/XPmFXHy.png" />
    </Icon>
  );
  return (
    <>
      {isLogin ? <Redirect to="/" /> : null}
      <Container style={{ width: '100%' }}>
        <Box display="flex" p={1} bgcolor="background.paper">
          <Box p={1} width="100%" >
          {/* <Button variant="outlined" >
          </Button> */}
            {svgIcon}
          </Box>
          <Box p={1} flexShrink={0}>
            <Link to="/register" style={{textDecoration: 'none'}}>
              <Button variant="outlined" color="primary" style={{textTransform: 'none'}}>
                Buat Akun Baru
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
      <Box display="flex" justifyContent="center" style={{marginTop: '5rem'}}>
        <Typography  component="h1" variant="h4">
          Selamat datang di Ukelas
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography  component="h1" variant="h4">
          Silahkan masuk dengan akun Anda
        </Typography>
      </Box>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <form onSubmit={handleLogin} className={classes.form} noValidate>
            <label>Email</label>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
              required
              fullWidth
              name="password"
              label="Password"
              type={values.showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={(e) => setValues(e.target.value)}
              value={values.password}
              placeholder="Masukkan password Anda disini"
              InputProps={{ // <-- This is where the toggle button is added.
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
                )
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
              style={{textTransform: 'none'}}
            >
              Masuk
            </Button>
          </form>
          <Typography style={{fontSize: '.7rem', color: '#6B7380', marginTop: '3em'}}>
            2020 © Berlatihbersama. All rights reserved.
          </Typography>
        </div>
      </Container>
    </>
  );
}
