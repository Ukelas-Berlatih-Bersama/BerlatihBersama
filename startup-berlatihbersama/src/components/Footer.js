import { Container, Typography } from "@material-ui/core";

const Footer = function (props) {
  const year = new Date();
  return (
    <footer
      style={{
        paddingTop: 32,
        paddingBottom: 32,
        marginTop: 32,
        fontSize: ".7rem",
        color: "#6B7380",
      }}
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
