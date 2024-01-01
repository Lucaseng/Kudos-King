import { Stack, Typography, Box, Container } from "@mui/material";
import React from "react";

function KudosChart() {
  return (
    <>
      <Container>
        {" "}
        <Stack alignItems="center">
          <Typography textAlign="center" fontFamily="Space Mono">
            <strong>Tim M.</strong> is the king of the hill with{" "}
            <strong>29</strong> kudos!
          </Typography>
        </Stack>
        <Stack
          pt={3}
          direction="row"
          justifyContent="center"
          alignItems="flex-end" // Set alignItems to "flex-end"
          spacing={2}
          sx={{ display: "flex" }}
        >
          <Box height="30vh" width="120px" bgcolor="#60D394">
            <Typography
              fontFamily={"Space Mono"}
              sx={{ padding: "10px", color: "#fff" }}
              align="center"
            >
              #2
            </Typography>
          </Box>
          <Box height="40vh" width="120px" bgcolor="primary.main">
            <Typography
              fontFamily={"Space Mono"}
              sx={{ padding: "10px", color: "#fff" }}
              align="center"
            >
              #1
            </Typography>
          </Box>
          <Box height="30vh" width="120px" bgcolor="#60D394">
            <Typography
              fontFamily={"Space Mono"}
              sx={{ padding: "10px", color: "#fff" }}
              align="center"
            >
              #3
            </Typography>
          </Box>
        </Stack>
      </Container>
    </>
  );
}

export default KudosChart;
