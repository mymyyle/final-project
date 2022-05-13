import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import Logo from "components/Logo";
import useAuth from "hooks/useAuth";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ColorModeContext } from "theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import "./MainHeader.scss";

export const AccountMenu = ({ user, logout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleAccount = () => {
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
  return (
    <Box>
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
          <Avatar sx={{ backgroundColor: "#ffa502" }}>{user.name[0]}</Avatar>
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
    </Box>
  );
};

const NAV_ITEMS = [
  { label: "Home", url: "/", className: "btn" },
  { label: "Jobs", url: "/jobs", className: "btn" },
  { label: "POST A JOB", url: "/post_job", className: "btn btn-post" },
];

const MainHeader = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      id="nav"
      sx={{
        position: "fixed",
        zIndex: 10,
        width: "100vw",
        backgroundColor: theme.palette.header,
      }}
    >
      <Box className="container">
        <Box className="logo">
          <Logo sx={{ height: "2.5rem" }} />
          <Typography
            component="span"
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            Volun
          </Typography>
          <span className="red">Cheers</span>
        </Box>

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
          <li>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                color: "text.primary",
                borderRadius: 1,
                p: 0.5,
              }}
            >
              <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Box>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default MainHeader;
