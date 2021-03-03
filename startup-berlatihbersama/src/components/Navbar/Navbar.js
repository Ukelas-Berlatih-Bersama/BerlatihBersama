import React, { useState } from "react";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import qoreContext from "../../qoreContext";
import { logout } from "../../store/actions/actionUser";
import { ExitToApp, PersonOutlineOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

import Logo from "../../image/brand-logo.svg";

import "./index.css";

const Navbar = function ({ page }) {
  const navbarStyle = {
    boxShadow: "0px 4px 10px rgba(107, 115, 128, 0.05)",
    backgroundColor: "#fff",
    color: "#111828",
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, status } = qoreContext.useCurrentUser();
  // console.log(user, ">>> user");
  // console.log(status, ">>> status");

  const handleMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShut = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    dispatch(logout());
    history.push("/");
  }

  function handleToProfile() {
    history.push("/profile");
  }

  return (
    <>
      {status == "success" ? (
        <AppBar position="static" style={navbarStyle}>
          <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between">
              <Toolbar>
                <Link to={"/"}>
                  <img src={Logo} />
                </Link>
              </Toolbar>
              <Box display="flex" justifyContent="space-between">
                <Toolbar className="menu-item active">
                  <HomeOutlinedIcon style={{ marginRight: ".5em" }} />
                  {/* <Typography>Mata Pelajaran</Typography> */}
                </Toolbar>
              </Box>
              <Toolbar>
                <Avatar
                  style={{ borderRadius: "4px", margin: "auto 1em" }}
                ></Avatar>
                <div style={{ marginRight: "1em" }}>
                  <Typography
                    variant="body1"
                    display="block"
                    noWrap
                    style={{ fontWeight: 500 }}
                  >
                    {user.data.nama}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    style={{ color: "#6B7380" }}
                  >
                    {user.email}
                  </Typography>
                </div>
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleMore}
                >
                  <ExpandMoreOutlinedIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleShut}
                >
                  <MenuItem onClick={handleToProfile} style={{ color: "blue" }}>
                    <PersonOutlineOutlined />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout} style={{ color: "red" }}>
                    <ExitToApp />
                    Logout
                  </MenuItem>
                </Menu>
              </Toolbar>
            </Box>
          </Container>
        </AppBar>
      ) : null}
    </>
  );
};

export default Navbar;
