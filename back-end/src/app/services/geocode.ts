import axios from 'axios';
import MESSAGES from '../helpers/messages';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export interface Geocode {
  error?: string;
  latitude: number;
  longitude: number;
}

const geocodingService = async (address: string): Promise<Geocode> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        address,
        key: GOOGLE_API_KEY,
      },
    });

    const { data } = response;

    if (data.status !== 'OK' || data.results.length === 0) {
      return {
        error: `${MESSAGES.GEOCODE_ERROR}: ${data.status}`,
        latitude: 0,
        longitude: 0,
      };
    }

    const location = data.results[0].geometry.location;

    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } catch (error: any) {
    throw new Error(`${MESSAGES.GEOCODE_ERROR}: ${error.message}`);
  }
};

export default geocodingService;
