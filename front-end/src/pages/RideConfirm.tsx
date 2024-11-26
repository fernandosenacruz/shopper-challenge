import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RideContext } from '../contexts/rideContext';
import GoogleMapComponent from '../components/GoogleMaComponent';
import DriverOptions from '../components/DriverOptions';
import { Box, Button, Grid2 } from '@mui/material';
import AlertDialog from '../components/AlertDialog';
import {
  customerValidate,
  driverValidate,
  validateRideEstimate,
} from '../utils/validations/rideConfirmeValidatios';
import { patchConfirm } from '../api/api';

const RideConfirm = () => {
  const { rideEstimate, customer, driver } = useContext(RideContext);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertDescription, setAlertDescription] = useState('');

  const navigate = useNavigate();

  console.log(rideEstimate);
  console.log(driver);

  const options = {
    origin: rideEstimate.origin,
    destination: rideEstimate.destination,
    ...rideEstimate.options,
    zoom: 15,
    uiDisabled: true,
  };

  const validateSend = (): boolean => {
    const validatedCustomer = customerValidate(customer.id);
    if (validatedCustomer?.message) {
      setAlertMessage(validatedCustomer.message);
      setOpenAlert(true);
      return false;
    }

    const validatedDriver = driverValidate(driver);
    if (validatedDriver?.message) {
      setAlertMessage(validatedDriver.message);
      setOpenAlert(true);
      return false;
    }

    const validatedRide = validateRideEstimate(rideEstimate);
    if (validatedRide?.message) {
      setAlertMessage(validatedRide.message);
      setOpenAlert(true);
      return false;
    }

    return true;
  };

  const handleSendConfirm = async () => {
    if (!validateSend()) return;

    const payload = {
      customer_id: customer.id,
      driver_id: driver.id,
      destination: rideEstimate.strDestination,
      origin: rideEstimate.strOrigin,
      distance: rideEstimate.distance,
      duration: rideEstimate.duration,
      driver: {
        id: driver.id,
        name: driver.name,
      },
      value: driver.value,
    };

    try {
      const result = await patchConfirm(payload);
      console.log(result);
      if (result?.error_code) {
        setAlertMessage(result.message);
        setAlertDescription(result.error_description);
        setOpenAlert(true);
        return;
      }
      navigate('/rides');
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Button type="button" variant="outlined" onClick={() => navigate('/')}>
          Alterar destino
        </Button>
        <Button type="button" variant="contained" onClick={handleSendConfirm}>
          Confirmar
        </Button>
      </Box>
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
      {openAlert && (
        <AlertDialog
          title={alertMessage}
          message={alertDescription}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      )}
    </div>
  );
};

export default RideConfirm;
