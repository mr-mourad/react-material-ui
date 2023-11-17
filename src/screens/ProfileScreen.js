import { Avatar, Container, Typography } from "@mui/material";
import React from "react";

function ProfileScreen(props) {
  let name = "";
  let email = "";
  let joined = "";
  let isAdmin = false;
  if (props.user) {
    name = props.user.name;
    email = props.user.email;
    joined = props.user.accCreated;
    isAdmin = props.user.isAdmin;
  }
  return (
    // <div>
    //   <h4>{name}</h4>
    //   <h6>{email}</h6>
    //   <p>{joined}</p>
    //   <p>{isAdmin ? "Admin User" : "user"}</p>
    // </div>

    <Container maxWidth="xs">
      <div className="loginWrap">
        <div className="formHeader">
          <Avatar
            alt={name.toUpperCase()}
            src="/static/images/avatar/sample.jpg"
          />
          <Typography variant="p">{isAdmin ? "Admin User" : "user"}</Typography>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h6">{email}</Typography>
          <Typography variant="p">{joined}</Typography>
        </div>
      </div>
    </Container>
  );
}

export default ProfileScreen;
