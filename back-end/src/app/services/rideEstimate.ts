import axios from 'axios';
import { Geocode } from './geocode';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const BASE_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';

export interface RideEstimateResponse {
  distanceMeters: number;
  durationSeconds: number;
}

const rideEstimate = async (
  origin: Geocode,
  destination: Geocode
): Promise<RideEstimateResponse> => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        origin: { location: { latLng: origin } },
        destination: { location: { latLng: destination } },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY,
          'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters',
        },
      }
    );

    const route = response.data.routes[0];
    return {
      distanceMeters: route.distanceMeters,
      durationSeconds: route.duration.seconds,
    };
  } catch (error: any) {
    console.error(
      'Erro ao consultar a API Routes:',
      error.response?.data || error.message
    );
    throw new Error('Falha ao obter estimativa de rota');
  }
};

export default rideEstimate;
