import {
  Container,
  LinearProgress,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KudosChart from "./KudosChart";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { BarChart } from "@mui/x-charts";
import { ArrowRight } from "@mui/icons-material";
import {
  blueberryTwilightPalette,
  mangoFusionPalette,
  cheerfulFiestaPalette,
  blueberryTwilightPaletteLight,
} from "@mui/x-charts/colorPalettes";

function Results() {
  const [isReady, setIsReady] = useState(false);
  const { token, isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [kudoerDict, setKudoerDict] = useState(() => {
    // Load kudoerDict from localStorage on component mount
    const storedDict = localStorage.getItem("kudoerDict");
    return storedDict ? JSON.parse(storedDict) : {};
  });
  const [kudoerArrSplit, setKudoerArrSplit] = useState([]);

  const [kudoerArr, setKudoerArr] = useState([]);

  const sortKudoers = (myDict) => {
    if (Object.keys(myDict).length === 0) {
      return;
    }

    let myArr = [];

    Object.entries(myDict).forEach(([person, value]) => {
      myArr.push([person, value]);
    });

    myArr.sort((a, b) => b[1] - a[1]);

    setKudoerArr(myArr);
    kudoArrSplitter(myArr);
  };

  const kudoArrSplitter = (arr) => {
    const kudoArrNames = [];
    const kudoArrValues = [];
    arr.forEach((i) => {
      kudoArrNames.push(i[0]);
      kudoArrValues.push(i[1]);
    });
    setKudoerArrSplit([kudoArrNames, kudoArrValues]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoggedIn) {
          console.log("You must be logged in to access this page!");
          navigate("/", { replace: true });
          return;
        }

        let myDict = { ...kudoerDict };

        if (Object.keys(kudoerDict).length === 0) {
          const response = await fetch(
            `https://www.strava.com/api/v3/activities?access_token=${token}`
          );

          if (!response.ok) {
            console.error(`Failed to fetch data. Status: ${response.status}`);
            return;
          }

          const json = await response.json();

          await Promise.all(
            json.map(async (activity) => {
              const kudoArr = await fetch(
                `https://www.strava.com/api/v3/activities/${activity.id}/kudos?access_token=${token}`
              ).then((response) => response.json());

              kudoArr.forEach((person) => {
                const name = person.firstname + " " + person.lastname;
                if (name in myDict) {
                  myDict[name] = myDict[name] + 1;
                } else {
                  myDict[name] = 1;
                }
              });
            })
          );

          localStorage.setItem("kudoerDict", JSON.stringify(myDict));
        }

        setKudoerDict(myDict);
        sortKudoers(myDict);
        setIsReady(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  return (
    <>
      {isReady ? (
        //<pre>{JSON.stringify(kudoerDict, null, 2)}</pre>
        <>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 5 }}
          >
            <KudosChart kudosArr={kudoerArr}></KudosChart>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
              <BarChart
                sx={{
                  pb: {
                    xs: 20,
                    md: 10,
                    lg: 6,
                  },
                  //change left yAxis label styles
                  "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                    strokeWidth: "0.4",
                    fill: "#fff",
                  },
                  // change all labels fontFamily shown on both xAxis and yAxis
                  "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                    fontFamily: "Space Mono",
                  },
                  // change bottom label styles
                  "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                    strokeWidth: "0.5",
                    fill: "#fff",
                  },
                  // bottomAxis Line Styles
                  "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                    stroke: "#fff",
                    strokeWidth: 2,
                  },
                  // leftAxis Line Styles
                  "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                    stroke: "#fff",
                    strokeWidth: 2,
                  },
                }}
                yAxis={[{ scaleType: "band", data: kudoerArrSplit[0] }]}
                series={[{ data: kudoerArrSplit[1] }]}
                height={600}
                layout="horizontal"
                colors={["#FC4C02"]}
              />
            </Container>
          </Box>
        </>
      ) : (
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
              <LinearProgress></LinearProgress>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default Results;
