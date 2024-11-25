import { useContext } from 'react';
import { RideContext } from '../contexts/rideContext';
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from '@mui/material';
import { IDriver, IDrivers } from '../interfaces/driver';
import StarRating from './StarRating';

const DriverOptions = ({ drivers }: IDrivers) => {
  const { setDriver } = useContext(RideContext);

  const handleDriver = (driver: IDriver) => {
    setDriver(driver);
  };

  const driversWithPhoto = drivers.map((driver) => {
    const image =
      driver.id === 1
        ? '/assets/img/photo_hommer.png'
        : '/assets/img/generic_driver.png';
    return { ...driver, image };
  });

  return (
    <>
      {drivers?.map((driver, index) => (
        <Button key={driver.id} onClick={() => handleDriver(driver)}>
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
                sx={{ textAlign: 'justify' }}
              >
                {driver.description}
              </Typography>
            </CardContent>
          </Card>
        </Button>
      ))}
    </>
  );
};

export default DriverOptions;
