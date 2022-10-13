import { Grid } from "@mui/material";
import "./Styles.css";
import { Link } from "react-router-dom";
import FoodDataService from "../Services/food";
import IconsDataService from "../Services/icons";
import React, { useState, useEffect } from "react";

function Food() {
  const [foodArray, setFoodArray] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const type = "voće";

  useEffect(() => {
    async function fetchFoodData() {
      try {
        setFoodArray(await getFoodArray());
      } catch (err) {
        console.log(err);
      }
    }
    fetchFoodData();
  }, []);

  const [iconsArray, setIconsArray] = useState([]);

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
          <img className="images" src={iconsArray["jela"]} alt="" />
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to={`/foods?type=${type}&subtype=svježe`}>
            <img className="images" src={iconsArray["svježe"]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to={`/foods?type=${type}&subtype=${foodArray[5]}`}>
            <img className="images" src={iconsArray[foodArray[5]]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to={`/foods?type=${type}&subtype=${foodArray[2]}`}>
            <img className="images" src={iconsArray[foodArray[2]]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to={`/foods?type=${type}&subtype=${foodArray[4]}`}>
            <img className="images" src={iconsArray[foodArray[4]]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to={`/foods?type=${type}&subtype=${foodArray[0]}`}>
            <img className="images" src={iconsArray[foodArray[0]]} alt="" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to={`/`}>
            <img className="images" src={iconsArray[foodArray[3]]} alt="" />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

async function getFoodArray() {
  const arr = await FoodDataService.getSubtypes();
  return arr.data;
}

async function getIconsArray() {
  const arr = await IconsDataService.getAll();
  return arr.data;
}

export default Food;
