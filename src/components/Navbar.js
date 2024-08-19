// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import Cookies from "js-cookie";

const Navbar = () => {
  
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar src={user?.photoUrl} />
        <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10 }}>
          ROL Student
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
