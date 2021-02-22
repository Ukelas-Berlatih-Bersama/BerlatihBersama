import React, { useState, useEffect } from "react";
import { Avatar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Sidebar from "../../components/sidebar";
import qoreContext from "../../qoreContext";
import { useParams, Link } from "react-router-dom";

export default function Profile() {
  const { user, status } = qoreContext.useCurrentUser();

  console.log(user, ">>> profile data");
  console.log(status, ">>> status");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <main style={{ flexGrow: 1, padding: 20, alignItems: "center" }}>
        <Avatar></Avatar>
        {user ? (
          <div>
            <Typography>Email : {user.email}</Typography>
            <Typography>Nama : {user.data.nama}</Typography>
            <Typography>Role : {user.data.role.displayField}</Typography>
            <Link to="/edit_profile">
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
              >
                Edit Profile
              </Button>
            </Link>
          </div>
        ) : (
          "Loading..."
        )}
      </main>
    </div>
  );
}
