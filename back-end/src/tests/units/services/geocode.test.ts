import axios from 'axios';
import geocodingService, { Geocode } from '../../../app/services/geocode';
import MESSAGES from '../../../app/helpers/messages';

jest.mock('axios');

describe('geocodingService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return latitude and longitude for a valid address', async () => {
    const mockResponse = {
      data: {
        status: 'OK',
        results: [
          {
            geometry: {
              location: {
                lat: 37.7749,
                lng: -122.4194,
              },
            },
          },
        ],
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result: Geocode = await geocodingService('San Francisco');

    expect(result.latitude).toBe(37.7749);
    expect(result.longitude).toBe(-122.4194);
    expect(result.error).toBeUndefined();
  });

  it('should return an error if the geocoding API returns no results', async () => {
    const mockResponse = {
      data: {
        status: 'ZERO_RESULTS',
        results: [],
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result: Geocode = await geocodingService('Unknown Place');

    expect(result.error).toBe(`${MESSAGES.GEOCODE_ERROR}: ZERO_RESULTS`);
    expect(result.latitude).toBe(0);
    expect(result.longitude).toBe(0);
  });

  it('should handle errors when the API call fails', async () => {
    const errorMessage = 'Request failed with status code 500';

    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(geocodingService('San Francisco')).rejects.toThrow(
      `${MESSAGES.GEOCODE_ERROR}: ${errorMessage}`
    );
  });

  it('should handle invalid status in the response', async () => {
    const mockResponse = {
      data: {
        status: 'INVALID_REQUEST',
        results: [],
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result: Geocode = await geocodingService('Invalid Place');

    expect(result.error).toBe(`${MESSAGES.GEOCODE_ERROR}: INVALID_REQUEST`);
    expect(result.latitude).toBe(0);
    expect(result.longitude).toBe(0);
  });
});
