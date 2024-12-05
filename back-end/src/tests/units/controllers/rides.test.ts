import { Document } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import rideService from '../../../app/services/ride';
import StatusCodes from '../../../app/helpers/statusCodes';
import MESSAGES from '../../../app/helpers/messages';
import ridesController from '../../../app/controllers/rides';
import { IRide } from '../../../app/infrastructure/database/models/ride';

jest.mock('../../../app/services/ride');
jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

const createMockRequest = () =>
  ({
    query: {},
    body: {},
    params: {},
  } as unknown as Request);

const createMockResponse = () =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response);

const mockNext = jest.fn() as unknown as NextFunction;

describe('ridesController', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = createMockRequest();
    res = createMockResponse();
    next = mockNext;
    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(true),
      array: jest.fn().mockReturnValue([]),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a success response with rides', async () => {
    const customer_id = '1';
    const driver_id = 2;
    const rides: (Document<unknown, {}, IRide> &
      IRide &
      Required<{ _id: unknown }> & { __v: number })[] = [
      {
        id: '1',
        date: new Date(),
        origin: 'A',
        destination: 'B',
        distance: 10,
        duration: '100s',
        driver: { id: 2, name: 'John Doe' },
        value: 100,
      } as unknown as Document<unknown, {}, IRide> &
        IRide &
        Required<{ _id: unknown }> & { __v: number },
    ];

    const getRidesByCustomerIdMock = jest
      .spyOn(rideService, 'getRidesByCustomerId')
      .mockResolvedValue(rides);

    req = { query: { customer_id: '1', driver_id: '2' } };
    res = createMockResponse();
    next = mockNext;

    await ridesController(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
    expect(getRidesByCustomerIdMock).toHaveBeenCalledWith({
      customer_id,
      driver_id,
    });
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.RIDE_SUCCESS,
      response: {
        customer_id,
        rides,
      },
    });
  });

  it('should return a bad request response with error message', async () => {
    const errorMessage = 'Invalid data';
    const validationResultMock = {
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest.fn().mockReturnValue([{ msg: errorMessage }]),
    };
    (validationResult as unknown as jest.Mock).mockReturnValue(
      validationResultMock
    );

    req = { query: { customer_id: '1', driver_id: '2' } };
    res = createMockResponse();
    next = mockNext;

    await ridesController(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
    expect(validationResultMock.isEmpty).toHaveBeenCalled();
    expect(rideService.getRidesByCustomerId).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.RIDE_BAD_REQUEST,
      error_code: MESSAGES.INVALID_DATA,
      error_description: errorMessage,
    });
  });

  it('should handle error messages and return the corresponding response', async () => {
    const customer_id = '1';
    const driver_id = 2;
    const errorMessage = 'Some error message';
    const getRidesByCustomerIdMock = jest
      .spyOn(rideService, 'getRidesByCustomerId')
      .mockResolvedValue(errorMessage);
    const handleErrorMessagesMock = jest.fn().mockReturnValue({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      json: { error: errorMessage },
    });
    jest
      .spyOn(require('../../../app/handlers/handleErrorMessage'), 'default')
      .mockReturnValue(handleErrorMessagesMock);

    req = { query: { customer_id: '1', driver_id: '2' } };
    res = createMockResponse();
    next = mockNext;

    await ridesController(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
    expect(getRidesByCustomerIdMock).toHaveBeenCalledWith({
      customer_id,
      driver_id,
    });
    expect(handleErrorMessagesMock).toHaveBeenCalledWith(errorMessage);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should call the next function with the error', async () => {
    const customer_id = '1';
    const driver_id = 2;
    const error = new Error('Some error');
    const getRidesByCustomerIdMock = jest
      .spyOn(rideService, 'getRidesByCustomerId')
      .mockRejectedValue(error);

    req = { query: { customer_id: '1', driver_id: '2' } };
    res = createMockResponse();
    next = mockNext;

    await ridesController(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
    expect(getRidesByCustomerIdMock).toHaveBeenCalledWith({
      customer_id,
      driver_id,
    });
    expect(next).toHaveBeenCalledWith(error);
  });
});
