import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IRideDetailing } from '../interfaces/ride';
import formatSecondsToHours from '../utils/validations/helpers/formatSecondsToHours';
import formatTimestamp from '../utils/validations/helpers/formatTimestamp';

const RideDetailing = ({
  rideDetailing,
}: {
  rideDetailing: IRideDetailing;
}) => {
  return (
    <Card
      key={rideDetailing.id}
      sx={{ maxWidth: 300, flexDirection: 'column' }}
    >
      <CardContent>
        <Grid>
          <Typography variant="h5">
            {formatTimestamp(rideDetailing.date)}
          </Typography>
          <Typography variant="h6">{rideDetailing.driver.name}</Typography>
        </Grid>
        <Typography variant="h6" color="text.secondary">
          Origen: {rideDetailing.origin}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Destino: {rideDetailing.destination}
        </Typography>
        <Grid>
          <Typography variant="h5">
            Km: {(rideDetailing.distance / 1000).toFixed(2)}
          </Typography>
          <Typography variant="h6">
            Tempo: {formatSecondsToHours(rideDetailing.duration)}
          </Typography>
          <Typography variant="h6">Valor: R$ {rideDetailing.value}</Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RideDetailing;
