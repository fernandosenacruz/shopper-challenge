import { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RideEstimateContext } from '../contexts/rideEstimate';
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Autocomplete } from '@react-google-maps/api';
import { getCustomer, getEstimate } from '../api/api';
import GoogleMapsLoader from './GoogleMapsLoader';
import AlertDialog from './AlertDialog';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const FormRideEstimate = () => {
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerError, setCustomerError] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { setCustomer, rideEstimate, setRideEstimate } =
    useContext(RideEstimateContext);

  const originRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destinationRef = useRef<google.maps.places.Autocomplete | null>(null);

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

  const handleGoogleLoad = () => setIsGoogleLoaded(true);

  const handlePlaceChange = (
    ref: React.MutableRefObject<google.maps.places.Autocomplete | null>,
    setPlace: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const place = ref.current?.getPlace();
    if (place?.formatted_address) {
      setPlace(place.formatted_address);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setCustomer({ id: customerId, name: customerName });

    try {
      const response = await getEstimate({
        customer_id: customerId,
        origin,
        destination,
      });

      setRideEstimate(response);
      navigate('/ride/confirm');
    } catch (error: any) {
      console.log(error);
      setAlertMessage(error.response.error_description);
      setOpenAlert(true);
      return;
    }
  };

  // Restrict to Brazil
  const options = {
    types: ['address'],
    componentRestrictions: { country: 'BR' },
  };

  return (
    <>
      {/* <GoogleMapsLoader apiKey={GOOGLE_API_KEY} onLoad={handleGoogleLoad} /> */}
      {/* {isGoogleLoaded && ( */}
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
            {/* <Autocomplete
                options={options}
                onLoad={(instance) => {
                  originRef.current = instance;
                }}
                onPlaceChanged={() => handlePlaceChange(originRef, setOrigin)}
              > */}
            <TextField
              label="Origem"
              variant="outlined"
              value={origin}
              required
              fullWidth
              onChange={(e) => setOrigin(e.target.value)}
            />
            {/* </Autocomplete> */}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} offset={{ xs: 2, sm: 3 }}>
            {/* <Autocomplete
                options={options}
                onLoad={(instance) => {
                  destinationRef.current = instance;
                }}
                onPlaceChanged={() =>
                  handlePlaceChange(destinationRef, setDestination)
                }
              > */}
            <TextField
              label="Destino"
              variant="outlined"
              value={destination}
              required
              fullWidth
              onChange={(e) => setDestination(e.target.value)}
            />
            {/* </Autocomplete> */}
          </Grid>
          <Grid offset={{ xs: 2, sm: 3 }}>
            <Button type="submit" color="success" variant="contained">
              Estimar
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* )} */}
      {openAlert && (
        <AlertDialog
          title="Erro"
          message={alertMessage}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      )}
    </>
  );
};

export default FormRideEstimate;
