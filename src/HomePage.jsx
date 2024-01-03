import React from "react";
import Navigation from "./Navigation";
import Test from "./Test";

import KudosChart from "./KudosChart";
import {
  Typography,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Grid,
} from "@mui/material";
function HomePage() {
  return (
    <>
      <Grid container>
        <Grid item xs={6.5} sx={{ height: "100%" }}>
          <Paper
            square
            elevation={24}
            sx={{ height: "100vh", bgcolor: "#000" }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography
                color="primary.main"
                textTransform={"uppercase"}
                fontSize={"1.5em"}
                variant="h1"
                sx={{ textAlign: "left", p: 3 }}
              >
                <strong>Who's your king of the hill?</strong>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={5.5}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1559166631-ef208440c75a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Button
              sx={{ m: 3 }}
              textTransform="none"
              variant="contained"
              href="#/results"
            >
              <Typography fontSize={"1.5em"} variant="h5">
                <strong>Sign in with Strava to continue</strong>
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
