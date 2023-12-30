import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

function Test() {
  const [myTest, setMyTest] = useState("hi");

  let myHashMap = {};

  const getActivityKudoers = async (activityId) => {
    let url = `https://www.strava.com/api/v3/activities/${activityId}/kudos?access_token=${
      import.meta.env.VITE_ACCESS_TOKEN
    }`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      json.forEach((i) => {
        let name = i.firstname + " " + i.lastname;
        if (name in myHashMap) {
          myHashMap[name] = myHashMap[name] + 1;
        } else {
          myHashMap[name] = 1;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sortKudoers = (myDict) => {
    // Check if the dictionary is empty
    if (Object.keys(myDict).length === 0) {
      setMyTest("Dictionary is empty");
      return;
    }

    let myArr = [];

    // Iterate over the key-value pairs of the dictionary
    Object.entries(myDict).forEach(([person, value]) => {
      myArr.push([person, value]);
    });

    // Sort the array based on the second element of each sub-array (the values)
    myArr.sort((a, b) => b[1] - a[1]);

    // Create a string representation of the sorted array
    let myStr = myArr.map(([person, value]) => `${person} ${value}`).join(", ");

    setMyTest(myStr);
  };

  useEffect(() => {
    const fetchData2 = async () => {
      let url = `https://www.strava.com/api/v3/activities?access_token=${
        import.meta.env.VITE_ACCESS_TOKEN
      }`;

      try {
        const response = await fetch(url);
        const json = await response.json();

        for (let i = 0; i < json.length; i++) {
          await getActivityKudoers(json[i].id);
        }

        sortKudoers(myHashMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData2();
  }, []);

  return (
    <>
      <Typography variant="h5">{myTest}</Typography>
    </>
  );
}

export default Test;
