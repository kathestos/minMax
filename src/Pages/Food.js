import { Grid } from '@mui/material';
import './Styles.css';

function Food() {

    const image = "https://res.cloudinary.com/mihael314/image/upload/v1653160177/sample.jpg";

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <img className="images" src={image} alt="Logo" />
            </Grid>
            <Grid item xs={6}>
                <img className="images" src={image} alt="Logo" />
            </Grid>
            <Grid item xs={6}>
                <img className="images" src={image} alt="Logo" />
            </Grid>
            <Grid item xs={6}>
                <img className="images" src={image} alt="Logo" />
            </Grid>
        </Grid>

    );

}

export default Food;
