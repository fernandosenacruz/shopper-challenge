import { useState } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import RideDetailing from '../components/RideDetailing';
import FormRideDetailing from '../components/FormRideDetailing';
import { IRideDetailing } from '../interfaces/ride';

const Rides = () => {
  const [rides, setRides] = useState<IRideDetailing[]>([]);

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100vw',
        margin: '2rem auto',
        padding: '1rem',
      }}
    >
      <Grid container spacing={2}>
        <FormRideDetailing setRides={setRides} />
      </Grid>
      <Grid container spacing={2}>
        {rides?.map((ride) => (
          <RideDetailing rideDetailing={ride} />
        ))}
      </Grid>
    </Box>
  );
};

export default Rides;
