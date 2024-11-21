import axios from 'axios';

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
        error: `Erro ao buscar coordenadas: ${data.status}`,
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
    console.error(`Erro na API Geocoding: ${error.message}`);
    throw new Error('Não foi possível obter as coordenadas.');
  }
};

export default geocodingService;
