import { Request, Response, NextFunction } from 'express';
import rideConfirmController from '../../../app/controllers/rideConfirm';
import rideService from '../../../app/services/ride';
import StatusCodes from '../../../app/helpers/statusCodes';
import MESSAGES from '../../../app/helpers/messages';
import handleErrorMessages from '../../../app/handlers/handleErrorMessage';
import { validationResult } from 'express-validator';

jest.mock('../../../app/services/ride');
jest.mock('../../../app/handlers/handleErrorMessage');
jest.mock('express-validator');

describe('rideConfirmController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        customer_id: '123',
        origin: 'Place A',
        destination: 'Place B',
        distance: 1000,
        duration: '15m',
        driver: { id: 1, name: 'Driver One' },
        value: 20,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('should return success when ride confirmation is successful', async () => {
    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(true),
      array: jest.fn().mockReturnValue([]),
    });
    (rideService.patchRideConfirm as jest.Mock).mockResolvedValue(
      MESSAGES.RIDE_SUCCESS
    );

    await rideConfirmController(req as Request, res as Response, next);

    expect(rideService.patchRideConfirm).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.RIDE_SUCCESS,
      response: { success: true },
    });
  });

  it('should return a validation error if validation fails', async () => {
    const errorMessage = 'Invalid data';
    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest.fn().mockReturnValue([{ msg: errorMessage }]),
    });

    await rideConfirmController(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.RIDE_BAD_REQUEST,
      error_code: MESSAGES.INVALID_DATA,
      error_description: errorMessage,
    });
  });

  it('should return an error response when ride service returns an error', async () => {
    const errorMessage = MESSAGES.NO_RIDES_FOUND;
    (rideService.patchRideConfirm as jest.Mock).mockResolvedValue(errorMessage);
    const mockError = {
      status: StatusCodes.NOT_FOUND,
      json: {
        message: MESSAGES.NO_RIDES_FOUND,
        error_code: 'RIDE_NOT_FOUND',
        error_description: errorMessage,
      },
    };
    (handleErrorMessages as jest.Mock).mockReturnValue(mockError);

    const result = await rideConfirmController(
      req as Request,
      res as Response,
      next
    );

    console.log('Result from rideService:', result);

    expect(handleErrorMessages).toHaveBeenCalledWith(errorMessage);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith(mockError.json);
  });

  it('should pass the error to the next middleware when an exception is thrown', async () => {
    const error = new Error('Unexpected error');
    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(true),
      array: jest.fn().mockReturnValue([]),
    });

    (rideService.patchRideConfirm as jest.Mock).mockRejectedValue(error);

    await rideConfirmController(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
