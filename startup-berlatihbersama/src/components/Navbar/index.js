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

import Logo from "../../image/brand-logo.svg";

const Navbar = function (props) {
  const navbarStyle = {
    boxShadow: "0px 4px 10px rgba(107, 115, 128, 0.05)",
    backgroundColor: "#fff",
    color: "#111828",
  };

  return (
    <AppBar position="fixed" style={navbarStyle}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between">
          <Toolbar>
            <img src={Logo} />
          </Toolbar>
          <Toolbar>
            <Typography>
              Kelas
            </Typography>
          </Toolbar>
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
            <Avatar style={{ borderRadius: "4px", margin: "auto 1em" }}>
              N
            </Avatar>
            <div style={{ marginRight: "1em" }}>
              <Typography
                variant="body"
                display="block"
                noWrap
                style={{ fontWeight: 500 }}
              >
                John Doe
              </Typography>
              <Typography
                variant="caption"
                display="block"
                style={{ color: "#6B7380" }}
              >
                john.doe@gmail.com
              </Typography>
            </div>
            <IconButton>
              <ExpandMoreOutlinedIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
