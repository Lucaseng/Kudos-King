import {
  Container,
  LinearProgress,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import KudosChart from "./KudosChart";

function Results() {
  const [isReady, setIsReady] = useState(false);
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid item>
          <Typography
            textTransform="uppercase"
            fontSize="1em"
            textAlign="center"
            sx={{ pb: 1 }}
          >
            <strong>Hold tight - This will only take a second!</strong>
          </Typography>
          {isReady ? (
            <KudosChart></KudosChart>
          ) : (
            <LinearProgress></LinearProgress>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Results;
