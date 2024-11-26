import React, { useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { getCustomer, getRides } from '../api/api';
import { RideContext } from '../contexts/rideContext';
import { customerValidate } from '../utils/validations/rideConfirmeValidatios';
import AlertDialog from '../components/AlertDialog';

const Rides = () => {
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerError, setCustomerError] = useState('');
  const [driverId, setDriverId] = useState('');
  const [driverName, setDriverName] = useState('');
  const [drivers, setDrivers] = useState([{ id: '1', name: 'ximira' }]);
  const [rides, setRides] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertDescription, setAlertDescription] = useState('');

  const { setCustomer, setRideEstimate } = useContext(RideContext);

  console.log('rides:', rides);

  const fetchCustomer = async (id: string) => {
    if (!id) {
      setCustomerName('');
      return;
    }
    try {
      const customer = await getCustomer(id);
      if (customer?.message) {
        setCustomerError(customer.message);
        return;
      }
      setCustomerName(customer?.name ?? '');
      setCustomerError('');
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
    }
  };

  const fetchDrivers = async () => {
    try {
      // const drivers = await getDrivers();
      return [];
    } catch (error: any) {
      setAlertMessage(error.response.error_description);
      setOpenAlert(true);
      return;
    }
  };

  const handleChange = (
    _event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setDriverId(newValue ?? '');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const rides = await getRides(customerId, driverId ? driverId : undefined);

      if (rides?.message) {
        setAlertMessage(rides.message);
        setAlertDescription(rides.error_description);
        setOpenAlert(true);
        return;
      }

      setRides(rides.rides);
    } catch (error: any) {
      setAlertMessage(error.response.error_description);
      setOpenAlert(true);
      return;
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          // maxWidth: '90dvw',
          margin: '0 auto',
        }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }} offset={{ xs: 2, sm: 3 }}>
            <TextField
              label="Id do Cliente"
              variant="outlined"
              value={customerId}
              required
              fullWidth
              onChange={(e) => setCustomerId(e.target.value)}
              onBlur={() => fetchCustomer(customerId)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} offset={{ xs: 2, sm: 3 }}>
            <TextField
              label={customerError ? `${customerError}` : 'Nome do Cliente'}
              variant="filled"
              value={customerName}
              disabled
              fullWidth
              error={!!customerError}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} offset={{ xs: 2, sm: 3 }}>
            <Select
              placeholder="Motorista"
              onChange={handleChange}
              sx={{ textAlign: 'center', width: '100%' }}
            >
              <Option value="0">Selecionar motorista</Option>
              {drivers.map((driver) => (
                <Option key={driver.id} value={driver.id}>
                  {driver.name}
                </Option>
              ))}
            </Select>
          </Grid>
          <Grid offset={{ xs: 2, sm: 3 }}>
            <Button
              type="submit"
              color="success"
              variant="contained"
              onSubmit={handleSubmit}
            >
              Filtrar
            </Button>
          </Grid>
        </Grid>
      </Box>
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

export default Rides;
