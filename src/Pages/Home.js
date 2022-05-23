import { Grid } from '@mui/material';
import './Styles.css';
import { Link } from 'react-router-dom';

function Home() {

    const image1 = "https://res.cloudinary.com/mihael314/image/upload/v1653160580/spori_cucanj_rrxrxm.gif";
    const image2 = "https://res.cloudinary.com/mihael314/image/upload/v1653160177/sample.jpg";

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <Link to="/workout">
                    <img className="images" src={image1} alt="Logo" />
                </Link>
            </Grid>
            <Grid item xs={6}>
                <Link to="/food">
                    <img className="images" src={image2} alt="Logo" />
                </Link>
            </Grid>
        </Grid>

    );

}

export default Home;
