import { Grid } from "@mui/material";
import "./Styles.css";
import { Link } from "react-router-dom";

function Home() {
  const logo =
    "https://res.cloudinary.com/mihael314/image/upload/v1664131445/ikone/new_logo_mluw8m.jpg";
  const exer =
    "https://res.cloudinary.com/mihael314/image/upload/v1657208959/ikone/vjezbe_fiwapl.jpg";
  const food =
    "https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/hrana_sttoeh.jpg";
  const todo =
    "https://res.cloudinary.com/mihael314/image/upload/v1657208959/ikone/todo_z95twc.png";
  const philo =
    "https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/fi_orpiet.png";
  const posses =
    "https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/posjed_ifqyiw.png";

  return (
    <div className="home-container">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} xl={3}>
          <Link to="/config">
            <img className="images" src={logo} alt="Logo" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/workout">
            <img className="images" src={exer} alt="Logo" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/food">
            <img className="images" src={food} alt="Logo" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/food">
            <img className="images" src={todo} alt="Logo" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/food">
            <img className="images" src={philo} alt="Logo" />
          </Link>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Link to="/food">
            <img className="images" src={posses} alt="Logo" />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
