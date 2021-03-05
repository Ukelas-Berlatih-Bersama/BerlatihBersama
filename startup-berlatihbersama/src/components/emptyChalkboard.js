// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   TextField,
//   Typography,
//   Button,
//   Modal,
//   Grid,
//   Container,
//   ButtonGroup,
//   Tabs,
//   Tab,
//   Paper,
// } from "@material-ui/core";
// import qoreContext from "../qoreContext";
// // import { useParams, useHistory } from "react-router-dom";
// // import CardSubject from "../../components/cardSubject";
// import Navbar from "../components/Navbar/Navbar";
// import { ArrowBack, Settings, AccountCircle } from "@material-ui/icons";
// import chalkBoardIllustration from "../image/class-chalkboard.svg";

// export default function EmptyChalkboard() {
//   return (
//     <div>
//       <Navbar />
//       <main style={{ flexGrow: 1, padding: 30 }}>
//         <Container className={classes.container}>
//           <ButtonGroup
//             style={{ display: "flex", justifyContent: "space-between" }}
//           >
//             <Button
//               startIcon={<ArrowBack />}
//               size="small"
//               variant="text"
//               color="primary"
//               onClick={handleBackClass}
//             >
//               Kembali ke Daftar Kelas
//             </Button>
//             <Button
//               startIcon={<Settings />}
//               size="small"
//               variant="text"
//               color="primary"
//               onClick={handleBuka}
//             >
//               Edit Kelas
//             </Button>
//             <Modal
//               open={buka}
//               onClose={handleTutup}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <form onSubmit={handleEditClass} className={classes.modal}>
//                 <Typography variant="h6">Edit Kelas</Typography>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   id="name"
//                   label="Edit Nama Kelas"
//                   name="name"
//                   fullWidth
//                   value={edit}
//                   onChange={(e) => setEdit(e.target.value)}
//                   style={{ margin: "20px 0 20px 0" }}
//                 ></TextField>
//                 <ButtonGroup
//                   style={{ display: "flex", justifyContent: "flex-end" }}
//                 >
//                   <Button variant="text" color="primary" onClick={handleTutup}>
//                     Batal
//                   </Button>
//                   <Button
//                     style={{ color: "GrayText" }}
//                     variant="text"
//                     type="submit"
//                   >
//                     Simpan Perubahan
//                   </Button>
//                 </ButtonGroup>
//               </form>
//             </Modal>
//           </ButtonGroup>
//           <div style={{ paddingTop: 10 }}>
//             <Typography variant="h4">{classroom.name}</Typography>
//           </div>
//           <div style={{ marginTop: 15 }}>
//             <div className={classes.gray}>
//               <Typography style={{ color: "#6B7380" }}>Kode Kelas:</Typography>
//               <Typography style={{ paddingLeft: 5 }}>
//                 {classroom.code}
//               </Typography>
//             </div>
//             <div className={classes.gray}>
//               <Typography style={{ color: "#6B7380" }}>
//                 Tahun Ajaran:
//               </Typography>
//               <Typography style={{ paddingLeft: 5 }}>
//                 {classroom.schoolYear}
//               </Typography>
//             </div>
//           </div>
//           <Grid className={classes.root}>
//             <Tabs
//               value={toogle}
//               onChange={handleSwitch}
//               indicatorColor="primary"
//               textColor="primary"
//               centered
//             >
//               <Tab style={{ width: 400 }} label="Mata Pelajaran" />
//               <Tab style={{ width: 400 }} label="Siswa" />
//             </Tabs>
//           </Grid>
//         </Container>
//       </main>
//       <Container maxWidth="lg" style={{ textAlign: "center" }}>
//         <img src={chalkBoardIllustration} style={{ marginBottom: 32 }} />
//         <Typography variant="h4" style={{ marginBottom: 16 }}>
//           Belum ada kelas satupun
//         </Typography>
//         <Typography variant="body1">
//           Mulai buat kelas dengan tekan tombol ‘Tambah Kelas’ atau ‘Gabung
//           Kelas’ untuk mulai kelola kelas Anda
//         </Typography>
//       </Container>
//     </div>
//   );
// }
