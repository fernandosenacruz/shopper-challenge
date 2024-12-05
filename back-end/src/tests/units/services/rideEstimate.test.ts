import axios from 'axios';
import rideEstimate, {
  RideEstimateResponse,
} from '../../../app/services/rideEstimate';
import MESSAGES from '../../../app/helpers/messages';
import { Geocode } from '../../../app/services/geocode';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('rideEstimate', () => {
  const mockOrigin: Geocode = { latitude: 40.7128, longitude: -74.006 };
  const mockDestination: Geocode = { latitude: 34.0522, longitude: -118.2437 };

  it('should return ride estimate on successful API call', async () => {
    const mockResponseData = {
      routes: [
        {
          distanceMeters: 4500000,
          duration: '3600s',
        },
      ],
    };
    mockedAxios.post.mockResolvedValue({ data: mockResponseData });

    const result: RideEstimateResponse = await rideEstimate(
      mockOrigin,
      mockDestination
    );

    expect(result).toEqual({
      distanceMeters: 4500000,
      durationSeconds: '3600s',
    });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://routes.googleapis.com/directions/v2:computeRoutes',
      {
        origin: { location: { latLng: mockOrigin } },
        destination: { location: { latLng: mockDestination } },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
          'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters',
        },
      }
    );
  });

  it('should throw an error if the API call fails', async () => {
    mockedAxios.post.mockRejectedValue({
      response: { data: { error: 'Invalid API Key' } },
    });

    await expect(rideEstimate(mockOrigin, mockDestination)).rejects.toThrow(
      'Falha ao obter estimativa de rota'
    );
  });

  it('should log and throw an error if the response does not have routes', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    mockedAxios.post.mockResolvedValue({ data: { routes: [] } });

    await expect(rideEstimate(mockOrigin, mockDestination)).rejects.toThrow(
      'Falha ao obter estimativa de rota'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      MESSAGES.API_ROUTE_ERROR,
      undefined
    );

    consoleSpy.mockRestore();
  });
});
