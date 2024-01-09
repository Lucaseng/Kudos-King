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

function Results() {
  const [isReady, setIsReady] = useState(false);
  const { token, isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [kudoerDict, setKudoerDict] = useState(() => {
    // Load kudoerDict from localStorage on component mount
    const storedDict = localStorage.getItem("kudoerDict");
    return storedDict ? JSON.parse(storedDict) : {};
  });

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
        } else {
          console.log(
            "You've already made the API calls! The dictionary already exists in local storage!"
          );
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
            <ol>
              {kudoerArr.map((athlete) => (
                <Typography fontFamily={"Space Mono"}>
                  <li key={athlete}>
                    {athlete[0]} - {athlete[1]} Kudos
                  </li>
                </Typography>
              ))}
            </ol>
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
