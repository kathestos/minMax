import { Grid } from "@mui/material";
import "./Styles.css";
import { Link } from "react-router-dom";
import IconsDataService from "../Services/icons";
import React, { useState, useEffect } from "react";

function Home() {
  if (!localStorage.getItem("token")) {
    window.location = "/minMax/login";
  }

  const [iconsArray, setIconsArray] = useState([]);

  useEffect(() => {
    async function fetchIconsData() {
      try {
        setIconsArray(await getIconsArray());
      } catch (err) {
        console.log(err);
      }
    }
    fetchIconsData();
  }, []);

  return (
    <div className="home-container">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} xl={3}>
          <Link to="/config">
            <img className="images" src={iconsArray["novi logo"]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/workout">
            <img className="images" src={iconsArray["vježbe"]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/food">
            <img className="images" src={iconsArray["hrana"]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/food">
            <img className="images" src={iconsArray["todo"]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/food">
            <img className="images" src={iconsArray["fi"]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/food">
            <img className="images" src={iconsArray["posjed"]} alt="" />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

async function getIconsArray() {
  const arr = await IconsDataService.getAll();
  return arr.data;
}

export default Home;
