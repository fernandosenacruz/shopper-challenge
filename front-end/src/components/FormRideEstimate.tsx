import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RideEstimateContext } from '../contexts/rideEstimate';
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getCustomer } from '../api/api';

const FormRideEstimate = () => {
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const { setCustomer } = useContext(RideEstimateContext);

  const fetchCustomer = async (id: string) => {
    if (!id) {
      setCustomerName('');
      return;
    }
    try {
      const customer = await getCustomer(id);
      setCustomerName(customer?.name ?? '');
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCustomer(customerId);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [customerId]);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCustomer({ id: customerId, name: customerName });
    console.log('Form Submitted:', { customerId, origin, destination });
    navigate('/ride/confirm');
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '90dvw',
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
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} offset={{ xs: 2, sm: 3 }}>
          <TextField
            label="Nome do Cliente"
            variant="filled"
            value={customerName}
            disabled
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} offset={{ xs: 2, sm: 3 }}>
          <TextField
            label="Origem"
            variant="outlined"
            value={origin}
            required
            fullWidth
            onChange={(e) => setOrigin(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} offset={{ xs: 2, sm: 3 }}>
          <TextField
            label="Destino"
            variant="outlined"
            value={destination}
            required
            fullWidth
            onChange={(e) => setDestination(e.target.value)}
          />
        </Grid>
        <Grid offset={{ xs: 2, sm: 3 }}>
          <Button type="submit" color="success" variant="contained">
            Estimar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormRideEstimate;
