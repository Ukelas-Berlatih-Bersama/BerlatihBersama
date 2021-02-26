import {
  Container,
  Box,
  Badge,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";

import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

import Logo from "../../image/brand-logo.svg";

import "./index.css";
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
          <Toolbar>
            <img src={Logo} />
          </Toolbar>
          <Box display="flex" justifyContent="space-between">
            <Toolbar className="menu-item active">
              <HomeOutlinedIcon style={{ marginRight: ".5em" }} />
              <Typography>Kelas</Typography>
            </Toolbar>
          </Box>
          <Toolbar>
            <IconButton>
              <Badge
                color="secondary"
                badgeContent={2}
                color="secondary"
                overlap="circle"
              >
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
            <ProfileMenu />
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
