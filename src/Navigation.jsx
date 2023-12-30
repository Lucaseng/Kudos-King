import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

function Navigation() {
  return (
    <>
      <AppBar color="primary" sx={{ mb: 3 }} position="static">
        <Toolbar>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.5em",
            }}
          >
            KUDOS KING
          </Typography>
          <Typography sx={{ pl: 1 }}>v1</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navigation;
