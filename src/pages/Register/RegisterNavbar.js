import {
  AppBar,
  Button,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "../../image/brand-logo.svg";


const RegisterNavbar = () => {
  return (
    <AppBar
      position="static"
      style={{
        boxShadow: "0px 4px 10px rgba(107, 115, 128, 0.07)",
        backgroundColor: "white",
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" py={1}>
          <Box p={1}>
            <Link to={"/"}>
              <img alt="edit" src={Logo} />
            </Link>
          </Box>
          <Box p={1}>
            <Typography component="span" style={{ color: "black" }}>
              Sudah punya akun?
            </Typography>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                color="primary"
                width={200}
                style={{ textTransform: "none" }}
              >
                Masuk Sekarang
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default RegisterNavbar;
