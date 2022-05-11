import { Typography } from "@mui/material";
import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      Profile
      <Typography>Name: {user.name}</Typography>
      <Typography>AboutMe: {user.aboutMe}</Typography>
    </div>
  );
};

export default Profile;
