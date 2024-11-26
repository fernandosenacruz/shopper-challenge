import { useContext } from 'react';
import { RideContext } from '../contexts/rideContext';
import GoogleMapComponent from '../components/GoogleMaComponent';
import DriverOptions from '../components/DriverOptions';
import { Box, Grid2 } from '@mui/material';

const RideConfirm = () => {
  const { rideEstimate } = useContext(RideContext);

  const options = {
    origin: rideEstimate.origin,
    destination: rideEstimate.destination,
    ...rideEstimate.options,
    zoom: 15,
    uiDisabled: true,
  };

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column-reverse',
          md: 'row',
        },
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100dw',
        margin: '0 auto',
      }}
    >
      <Grid2 container sx={{ xs: 12, md: 6 }}>
        <GoogleMapComponent options={options} />
      </Grid2>
      <Grid2 container sx={{ xs: 12, md: 6 }}>
        <DriverOptions drivers={rideEstimate.options} />
      </Grid2>
    </Box>
  );
};

export default RideConfirm;
