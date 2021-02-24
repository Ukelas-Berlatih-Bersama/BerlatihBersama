import { Container, Box, Typography } from "@material-ui/core";

const Footer = function (props) {
  const year = new Date();
  return (
    <footer
      style={{ position: "absolute", bottom: 40, left: 0, width: "100%" }}
    >
      <Container maxWidth="lg" style={{ textAlign: "center" }}>
        <Typography>
          {year.getUTCFullYear()} &copy; Berlatihbersama. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
