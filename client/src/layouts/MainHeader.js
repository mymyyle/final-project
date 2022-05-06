import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import Logo from "components/Logo";
import useAuth from "hooks/useAuth";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./MainHeader.scss";

export const AccountMenu = ({ user, logout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleAccount = () => {
    console.log(`click`);
    navigate("/account");
  };
  const handleLogout = () => {
    logout(() => {
      navigate("/login");
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(user.name);
  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {user.avatarUrl ? (
          <Avatar alt={user.name} src={user.avatarUrl} />
        ) : (
          <Avatar sx={{ bgcolor: "#ffa502" }}>{user.name[0]}</Avatar>
        )}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleAccount}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

const NAV_ITEMS = [
  { label: "Home", url: "/", className: "btn" },
  { label: "Jobs", url: "/jobs", className: "btn" },
  { label: "POST A JOB", url: "/post_job", className: "btn btn-post" },
];

const MainHeader = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <div id="nav">
      <div className="container">
        <div className="logo">
          <Logo sx={{ height: "2.5rem" }} />
          Volun
          <span className="red">Cheers</span>
        </div>

        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive ? `${item.className} selected` : item.className
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            {isAuthenticated ? (
              <AccountMenu user={user} logout={logout} />
            ) : (
              <NavLink className="btn" to="/login">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainHeader;
