import { Grid } from "@mui/material";
import "./Styles.css";
import React from "react";
import { Link } from "react-router-dom";

function Workout() {
  const train =
    "https://res.cloudinary.com/mihael314/image/upload/v1657208959/ikone/trening_fyhtxp.jpg";
  const pushup =
    "https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/sklek_i4kabp.jpg";
  const skills =
    "https://res.cloudinary.com/mihael314/image/upload/v1657208959/ikone/vjestine_z5gpiq.png";
  const legs =
    "https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/noge_v7i8a9.jpg";
  const abs =
    "https://res.cloudinary.com/mihael314/image/upload/v1657208959/ikone/trbuh_q7jkxl.jpg";
  const empty =
    "https://res.cloudinary.com/mihael314/image/upload/v1664203987/ikone/empty_pnufum.jpg";

  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} xl={3}>
          <img className="images" src={train} alt="Logo" />
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/chest">
            <img className="images" src={pushup} alt="Logo" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <img className="images" src={skills} alt="Logo" />
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/legs">
            <img className="images" src={legs} alt="Logo" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <img className="images" src={empty} alt="Logo" />
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/abs">
            <img className="images" src={abs} alt="Logo" />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Workout;
