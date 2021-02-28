import {
  Container,
  Box,
  Badge,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

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

  return (
    <AppBar position="static" style={navbarStyle}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between">
          <Toolbar style={{padding: 0}}>
            <img src={Logo} />
          </Toolbar>
          <Box display="flex" justifyContent="space-between">
            <Toolbar className="menu-item active">
              <HomeOutlinedIcon style={{ marginRight: ".5em" }} />
              <Typography>Kelas</Typography>
            </Toolbar>
          </Box>
          <Toolbar>
            <NotificationMenu />
            <ProfileMenu />
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
