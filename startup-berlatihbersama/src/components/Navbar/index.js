import { Container, Box, AppBar, Toolbar, Typography } from "@material-ui/core";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../image/brand-logo.svg";

import "./index.css";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";

const Navbar = function (props) {
  const navbarStyle = {
    boxShadow: "0px 4px 10px rgba(107, 115, 128, 0.05)",
    backgroundColor: "#fff",
    color: "#111828",
  };

  const { pathname } = useLocation();
  // active indicator menu on page / and /classroom/(any)
  const activeClassName =
    /classroom\/+./.test(pathname) || pathname === "/" ? "active" : null;

  return (
    <AppBar position="static" style={navbarStyle}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between">
          <Toolbar style={{ padding: 0 }}>
            <Link to={"/"}>
              <img src={Logo} alt="logo" />
            </Link>
          </Toolbar>
          <Box display="flex" justifyContent="space-between">
            <Toolbar className={`menu-item ${activeClassName}`}>
              <HomeOutlinedIcon style={{ marginRight: ".5em" }} />
              <Typography>Kelas</Typography>
            </Toolbar>
          </Box>
          <Toolbar style={{ padding: 0 }}>
            <NotificationMenu />
            <ProfileMenu />
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
