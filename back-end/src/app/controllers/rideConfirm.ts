import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import StatusCodes from '../helpers/statusCodes';
import MESSAGES from '../helpers/messages';
import rideService from '../services/ride';
import handleErrorMessages from '../handlers/handleErrorMessage';

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

    const result = await rideService.patchRideConfirm(req.body);

    if (typeof result === 'string' && result !== MESSAGES.RIDE_SUCCESS) {
      const { status, json } = handleErrorMessages(result);
      res.status(status).json(json);
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
