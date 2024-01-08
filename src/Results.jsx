import {
  Container,
  LinearProgress,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KudosChart from "./KudosChart";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Results() {
  const [isReady, setIsReady] = useState(false);
  const { token, isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [kudoerDict, setKudoerDict] = useState({});

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("You must be logged in to access this page!");
      navigate("/", { replace: true });
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://www.strava.com/api/v3/activities?access_token=${token}`
          );

          if (!response.ok) {
            console.error(`Failed to fetch data. Status: ${response.status}`);
            return;
          }

          const json = await response.json();

          let myDict = { ...kudoerDict };

          // Use Promise.all to wait for all inner fetch operations to complete
          await Promise.all(
            json.map(async (activity) => {
              const kudoArr = await fetch(
                `https://www.strava.com/api/v3/activities/${activity.id}/kudos?access_token=${token}`
              ).then((response) => response.json());

              kudoArr.forEach((person) => {
                const name = person.firstname + " " + person.lastname;
                myDict = { ...myDict }; // Ensure immutability by creating a new object
                if (name in myDict) {
                  myDict[name] = myDict[name] + 1;
                } else {
                  myDict[name] = 1;
                }
              });
            })
          );

          setKudoerDict(myDict);
          console.log(kudoerDict);
          setIsReady(true);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [isLoggedIn]);

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid item>
          {isReady ? (
            <pre>{JSON.stringify(kudoerDict, null, 2)}</pre>
          ) : (
            //<KudosChart></KudosChart>
            <>
              <Typography
                textTransform="uppercase"
                fontSize="1em"
                textAlign="center"
                sx={{ pb: 1 }}
              >
                <strong>Hold tight - This will only take a second!</strong>
              </Typography>
              <LinearProgress></LinearProgress>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Results;
