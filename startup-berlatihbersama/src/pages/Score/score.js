import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import { ArrowBack, Settings, Search } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
import Navbar from "../../components/Navbar/Navbar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 7em 0em 7em",
  },
}));

function createData(nama, jawaban, waktu, nilai, aksi) {
  return { nama, jawaban, waktu, nilai, aksi };
}

const rows = [
  createData(
    "Ananda Amor",
    "Lihat Jawaban",
    "24 Februari 2021, 12:40",
    90,
    "Beri Nilai"
  ),
  createData("Amanda Nadia", "Belum Mengumpulkan", "-", 0, "Beri Nilai"),
  createData(
    "Cyntya Agustina",
    "Belum Mengumpulkan",
    "24 Februari, 12:40",
    60,
    "Beri Nilai"
  ),
  createData("Bagus Tubagus", "Belum Mengumpulkan", "-", 0, "Beri Nilai"),
];

export default function Score() {
  const classes = useStyles();
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/");
  };

  return (
    <div>
      <Navbar />
      <main style={{ flexGrow: 1, padding: 30 }}>
        <Container className={classes.container}>
          <ButtonGroup
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              startIcon={<ArrowBack />}
              size="small"
              variant="text"
              color="primary"
              onClick={handleGoBack}
            >
              Kembali ke Halaman Utama
            </Button>
            <Button
              startIcon={<Settings />}
              size="small"
              variant="text"
              color="primary"
              //   onClick={handleBuka}
            >
              Edit Materi
            </Button>
          </ButtonGroup>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", marginTop: 10 }}
          >
            Bahasa Inggris / Tugas BAB - 3 Perfect Tense
          </Typography>
          <div style={{ display: "flex", marginTop: 10 }}>
            <Typography style={{ color: "#6B7380" }}>Batas waktu:</Typography>
            <Typography style={{ paddingLeft: 5, fontWeight: "bold" }}>
              2 Mar 2021
            </Typography>
          </div>
          <Grid style={{ marginTop: "5%" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">
                Siswa yang telah mengumpulkan jawaban (1/5)
              </Typography>
              <TextField
                label="Cari Siswa"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
                style={{ width: "30%" }}
              />
            </div>
          </Grid>
          <Paper elevation={3} style={{ marginTop: "3%" }}>
            <TableContainer>
              <Table>
                <TableHead style={{ backgroundColor: "skyblue" }}>
                  <TableCell align="left">Nama Siswa</TableCell>
                  <TableCell align="left">Jawaban</TableCell>
                  <TableCell align="left">Waktu Pengumpulan</TableCell>
                  <TableCell align="left">Nilai</TableCell>
                  <TableCell align="left">Aski</TableCell>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.nama}>
                      <TableCell component="th" scope="row">
                        {row.nama}
                      </TableCell>
                      <TableCell align="left">{row.jawaban}</TableCell>
                      <TableCell align="left">{row.waktu}</TableCell>
                      <TableCell align="left">{row.nilai}</TableCell>
                      <TableCell align="left">
                        <Button color="primary" variant="contained">
                          {row.aksi}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <TableRow
                style={{
                  height: 60,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination style={{ marginTop: 13 }} count={10}></Pagination>
              </TableRow>
            </TableContainer>
          </Paper>
        </Container>
      </main>
    </div>
  );
}
