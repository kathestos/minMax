import { Grid } from "@mui/material";
import "./Styles.css";
import { Link } from "react-router-dom";
import IconsDataService from "../Services/icons";
import React, { useState, useEffect } from "react";

function Workout() {
  const [iconsArray, setIconsArray] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchIconsData() {
      try {
        setLoading(true);
        setIconsArray(await getIconsArray());
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchIconsData();
  }, []);

  return (
    <div className={isLoading ? "op0" : ""}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} xl={3}>
        <Link to="/exoverview">
          <img className="images" src={iconsArray["trening"]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/workouts?type=prsa">
            <img className="images" src={iconsArray["prsa"]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <img className="images" src={iconsArray["vještine"]} alt="" />
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/workouts?type=noge">
            <img className="images" src={iconsArray["noge"]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <img className="images" src={iconsArray["prazna"]} alt="" />
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/workouts?type=trbuh">
            <img className="images" src={iconsArray["trbuh"]} alt="" />
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

export default Workout;
