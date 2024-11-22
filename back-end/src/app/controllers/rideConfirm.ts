import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import StatusCodes from '../helpers/statusCodes';
import MESSAGES from '../helpers/messages';
import rideService from '../services/ride';

const rideConfirmController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: MESSAGES.RIDE_BAD_REQUEST,
        error_code: MESSAGES.INVALID_DATA,
        error_description: errors.array()[0].msg,
      });
      return;
    }

    const result = await rideService.postRideConfirm(req.body);
    if (result === MESSAGES.USER_NOT_FOUND) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: MESSAGES.USER_NOT_FOUND,
        error_code: 'USER_NOT_FOUND',
        error_description: result,
      });
      return;
    }
    if (result === MESSAGES.DRIVER_NOT_FOUND) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: MESSAGES.DRIVER_NOT_FOUND,
        error_code: 'DRIVER_NOT_FOUND',
        error_description: result,
      });
      return;
    }
    if (result === MESSAGES.INVALID_DISTANCE) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: MESSAGES.DISTANCE_NOT_ACEPTABLE,
        error_code: 'INVALID_DISTANCE',
        error_description: result,
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: MESSAGES.RIDE_SUCCESS,
      response: { success: true },
    });
  } catch (error: any) {
    next(error);
  }
};

export default rideConfirmController;