import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import rideEstimateController from '../../../app/controllers/rideEstimate';
import geocodingService from '../../../app/services/geocode';
import rideEstimate from '../../../app/services/rideEstimate';
import rideService from '../../../app/services/ride';
import MESSAGES from '../../../app/helpers/messages';
import StatusCodes from '../../../app/helpers/statusCodes';

jest.mock('express-validator');
jest.mock('../../../app/services/geocode');
jest.mock('../../../app/services/rideEstimate');
jest.mock('../../../app/services/ride');

describe('rideEstimateController', () => {
  let req: Request;
  let res: Response;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        origin: '123 Main St',
        destination: '456 Elm St',
      },
    } as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error response if there are validation errors', async () => {
    const validationErrors = [
      {
        msg: 'Nenhum registro encontrado',
      },
    ];

    (validationResult as unknown as jest.Mock).mockReturnValueOnce({
      isEmpty: () => false,
      array: () => validationErrors,
    });

    await rideEstimateController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      error_code: MESSAGES.NO_RIDES_FOUND,
      message: validationErrors[0].msg,
      error_description: MESSAGES.NOT_FOUND,
    });
  });

  it('should return an error response if geocoding service returns an error for origin', async () => {
    const geocodeError = 'Geocoding error';

    (validationResult as unknown as jest.Mock).mockReturnValueOnce({
      isEmpty: () => true,
    });

    (geocodingService as jest.Mock).mockResolvedValueOnce({
      error: geocodeError,
    });

    await rideEstimateController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      error_code: MESSAGES.NO_RIDES_FOUND,
      message: MESSAGES.NOT_FOUND,
      error_description: geocodeError,
    });
  });

  it('should return an error response if geocoding service returns an error for destination', async () => {
    const geocodeError = 'Geocoding error';

    (validationResult as unknown as jest.Mock).mockReturnValueOnce({
      isEmpty: () => true,
    });

    (geocodingService as jest.Mock)
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({
        error: geocodeError,
      });

    await rideEstimateController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      error_code: MESSAGES.NO_RIDES_FOUND,
      message: MESSAGES.NOT_FOUND,
      error_description: geocodeError,
    });
  });

  it('should return a successful response with ride estimate data', async () => {
    const geocodeOrigin = {
      lat: '123',
      lng: '456',
    };

    const geocodeDestination = {
      lat: '789',
      lng: '012',
    };

    const rideEstimateData = {
      distanceMeters: 1000,
      durationSeconds: '600',
    };

    const rideOptions = [
      {
        type: 'car',
        price: 10,
      },
      {
        type: 'bike',
        price: 5,
      },
    ];

    (validationResult as unknown as jest.Mock).mockReturnValueOnce({
      isEmpty: () => true,
    });

    (geocodingService as jest.Mock)
      .mockResolvedValueOnce(geocodeOrigin)
      .mockResolvedValueOnce(geocodeDestination);

    (rideEstimate as jest.Mock).mockResolvedValueOnce(rideEstimateData);

    (rideService.getRideEstimate as jest.Mock).mockResolvedValueOnce(
      rideOptions
    );

    await rideEstimateController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      response: {
        origin: geocodeOrigin,
        destination: geocodeDestination,
        distance: rideEstimateData.distanceMeters,
        duration: rideEstimateData.durationSeconds,
        options: rideOptions,
        routeResponse: rideEstimateData,
        message: MESSAGES.RIDE_SUCCESS,
      },
    });
  });

  it('should call the next middleware with an error if an exception is thrown', async () => {
    const error = new Error('Internal server error');

    (validationResult as unknown as jest.Mock).mockReturnValueOnce({
      isEmpty: () => true,
    });

    (geocodingService as jest.Mock).mockResolvedValueOnce({});
    (rideEstimate as jest.Mock).mockRejectedValueOnce(error);

    await rideEstimateController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
