import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button } from "@material-ui/core";
import Sidebar from "../../components/sidebar";
import qoreContext from "../../qoreContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function EditProfile() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { user } = qoreContext.useCurrentUser();
  //   console.log(JSON.stringify(user, null, 2), ">>> user");
  //   console.table(user);
  const { updateRow, status } = qoreContext.view("allMember").useUpdateRow();
  //   console.log(user.data.id, ">> id");

  async function EditProfile() {
    await updateRow(user.id, { email: email, nama: name });
  }

  return (
    <div className={classes.root}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: 30 }}>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <form onChange={EditProfile}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nama"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Edit
          </Button>
        </form>
      </main>
    </div>
  );
}
