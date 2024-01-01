import { Stack, Typography, Box, Container } from "@mui/material";
import React from "react";

function KudosChart({ winnerArr }) {
  return (
    <>
      <Stack alignItems="center">
        {" "}
        <Stack alignItems="center">
          <Typography textAlign="center" sx={{ pb: 3 }} fontFamily="Space Mono">
            <strong>Tim M.</strong> is the King of the Hill with{" "}
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
        <Box
          height="2px"
          sx={{
            width: { xs: "425px", md: "480px", lg: "500px" },
          }}
          bgcolor="#fff"
        ></Box>
      </Stack>
    </>
  );
}

export default KudosChart;
