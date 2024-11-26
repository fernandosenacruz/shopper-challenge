import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RideContext } from '../contexts/rideContext';
import { IDriver, IDrivers } from '../interfaces/driver';
import AlertDialog from '../components/AlertDialog';
import { patchConfirm } from '../api/api';
import StarRating from './StarRating';
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from '@mui/material';
import {
  customerValidate,
  driverValidate,
  validateRideEstimate,
} from '../utils/validations/rideConfirmeValidatios';

const DriverOptions = ({ drivers }: IDrivers) => {
  const { rideEstimate, customer, driver } = useContext(RideContext);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertDescription, setAlertDescription] = useState('');

  const navigate = useNavigate();
  const { setDriver } = useContext(RideContext);

  const handleDriver = async (driver: IDriver) => {
    setDriver(driver);
    await handleSendConfirm();
  };

  const driversWithPhoto = drivers.map((driver) => {
    const image =
      driver.id === 1
        ? '/assets/img/photo_hommer.png'
        : '/assets/img/generic_driver.png';
    return { ...driver, image };
  });

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
    <>
      {drivers?.map((driver, index) => (
        <>
          <Card sx={{ maxWidth: 300, flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="200"
              image={driversWithPhoto[index].image}
              title={driver.name}
              sx={{ objectFit: 'contain' }}
            />
            <CardContent>
              <StarRating review={driver.review} />
              <Typography variant="h5" component="div">
                {driver.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  height: '3rem',
                  overflow: 'scroll',
                  textAlign: 'justify',
                }}
              >
                {driver.description}
              </Typography>
            </CardContent>
            <Button key={driver.id} onClick={() => handleDriver(driver)}>
              Escolher
            </Button>
          </Card>
        </>
      ))}
      {openAlert && (
        <AlertDialog
          title={alertMessage}
          message={alertDescription}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      )}
    </>
  );
};

export default DriverOptions;
