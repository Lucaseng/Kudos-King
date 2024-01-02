import React from "react";
import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";

function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setProfileMenuOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setProfileMenuOpen(false);
  };

  return (
    <>
      <AppBar color="primary" sx={{ mb: 3 }} position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.5em",
              }}
            >
              KUDOS KING
            </Typography>
            <Typography fontFamily={"Space Mono"} sx={{ pl: 1 }}>
              v1
            </Typography>
          </span>
          <Box>
            <IconButton onClick={handleClick}>
              <Avatar />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={profileMenuOpen}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar /> Lucas E.
              </MenuItem>
              <Divider />

              <MenuItem>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navigation;
