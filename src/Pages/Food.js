import { Grid } from '@mui/material';
import './Styles.css';

function Food() {

    const food = "https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/jela_bsjyli.jpg";
    const fresh = "https://res.cloudinary.com/mihael314/image/upload/v1657208959/ikone/svjeze_w4wt11.png";
    const dried = "https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/suseno_kbtw06.png";
    const nuts = "https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/orasasto_h5q1es.png";
    const seeds = "https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/sjemenke_wz60fw.png";
    const berries = "https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/bobice_clz2sl.png";
    const misc = "https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/ostalo_u8rng6.png";

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6} xl={3}>
                <img className="images" src={food} alt="Logo" />
            </Grid>
            <Grid item xs={6} xl={3}>
                <img className="images" src={fresh} alt="Logo" />
            </Grid>
            <Grid item xs={6} xl={3}>
                <img className="images" src={dried} alt="Logo" />
            </Grid>
            <Grid item xs={6} xl={3}>
                <img className="images" src={nuts} alt="Logo" />
            </Grid>
            <Grid item xs={6} xl={3}>
                <img className="images" src={seeds} alt="Logo" />
            </Grid>
            <Grid item xs={6} xl={3}>
                <img className="images" src={berries} alt="Logo" />
            </Grid>
            <Grid item xs={6} xl={3}>
                <img className="images" src={misc} alt="Logo" />
            </Grid>
        </Grid>

    );

}

export default Food;
