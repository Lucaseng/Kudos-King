import { Stack, Typography, Box, Container } from "@mui/material";
import React from "react";

function KudosChart({ kudosArr }) {
  if (kudosArr.length == 0) {
    <>
      <Typography textAlign="center" fontFamily="Space Mono">
        You don't have enough data!
      </Typography>
    </>;
  }
  if (kudosArr.length > 0 && kudosArr.length < 3) {
    return (
      <>
        <Typography textAlign="center" fontFamily="Space Mono">
          <strong>{kudosArr[0][0]}</strong> is the King of the Hill dealing{" "}
          <strong>{kudosArr[0][1]}</strong> kudos!
        </Typography>
      </>
    );
  }
  return (
    <>
      <Stack alignItems="center">
        {" "}
        <Stack alignItems="center">
          <Typography textAlign="center" fontFamily="Space Mono">
            <strong>{kudosArr[0][0]}</strong> is the King of the Hill dealing{" "}
            <strong>{kudosArr[0][1]}</strong> kudos!
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
          <Stack>
            <Typography
              fontWeight="700"
              fontFamily={"Space Mono"}
              textAlign="center"
            >
              {kudosArr[1][0]}
            </Typography>
            <Box
              alignItems="flex-end"
              height="13vh"
              width="120px"
              bgcolor="#60D394"
            >
              <Typography
                fontFamily={"Space Mono"}
                sx={{ padding: "10px", color: "#000" }}
                align="center"
              >
                #2
              </Typography>
              <Typography
                color="#000"
                fontFamily={"Space Mono"}
                textAlign="center"
              >
                {kudosArr[1][1]} Kudos
              </Typography>
            </Box>
          </Stack>

          <Stack>
            <Typography
              fontWeight="700"
              fontFamily={"Space Mono"}
              textAlign="center"
            >
              {kudosArr[0][0]}
            </Typography>

            <Box height="20vh" width="120px" bgcolor="primary.main">
              <Typography
                fontFamily={"Space Mono"}
                sx={{ padding: "10px", color: "#fff" }}
                align="center"
              >
                #1
              </Typography>
              <Typography fontFamily={"Space Mono"} textAlign="center">
                {kudosArr[0][1]} Kudos
              </Typography>
            </Box>
          </Stack>

          <Stack>
            <Typography
              fontWeight="700"
              fontFamily={"Space Mono"}
              textAlign="center"
            >
              {kudosArr[2][0]}
            </Typography>
            <Box height="13vh" width="120px" bgcolor="#60D394">
              <Typography
                fontFamily={"Space Mono"}
                sx={{ padding: "10px", color: "#000" }}
                align="center"
              >
                #3
              </Typography>
              <Typography
                color="#000"
                fontFamily={"Space Mono"}
                textAlign="center"
              >
                {kudosArr[2][1]} Kudos
              </Typography>
            </Box>
          </Stack>
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
