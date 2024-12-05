import { Request, Response, NextFunction } from 'express';
import driverController from '../../../app/controllers/driver';
import driverService from '../../../app/services/driver';
import StatusCodes from '../../../app/helpers/statusCodes';
import MESSAGES from '../../../app/helpers/messages';
import handleErrorMessages from '../../../app/handlers/handleErrorMessage';

jest.mock('../../../app/services/driver');
jest.mock('../../../app/handlers/handleErrorMessage');

describe('userController', () => {
  let res: Partial<Response>;
  let req: Request;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return success with a list of drivers when getDrivers is successful', async () => {
    const mockDrivers = [
      { id: 1, name: 'Driver One' },
      { id: 2, name: 'Driver Two' },
    ];

    (driverService.getDrivers as jest.Mock).mockResolvedValue(mockDrivers);

    await driverController(req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.USER_SUCCESS,
      response: mockDrivers,
    });
  });

  it('should return an error response when getDrivers returns a string error', async () => {
    const mockErrorMessage = 'Something went wrong';

    (driverService.getDrivers as jest.Mock).mockResolvedValue(mockErrorMessage);

    (handleErrorMessages as jest.Mock).mockReturnValue({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      json: { message: mockErrorMessage },
    });

    await driverController(req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: mockErrorMessage });
  });

  it('should call the error handler and return the correct error message when an exception is thrown', async () => {
    const error = new Error('Unexpected error');

    (driverService.getDrivers as jest.Mock).mockRejectedValue(error);

    await driverController(req, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
