import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Redirect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { user, login, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://www.strava.com/oauth/token?client_id=${
        import.meta.env.VITE_CLIENT_ID
      }&client_secret=${
        import.meta.env.VITE_CLIENT_SECRET
      }&code=${code}&grant_type=authorization_code`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        login(json.athlete, json.access_token, json.expires_at);
        navigate("/results", { replace: true });
      })
      .catch((error) => console.error(error));
  }, []);

  return <Typography color="#fff">redirecting...</Typography>;
}

export default Redirect;
