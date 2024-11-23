import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import rideService from '../services/ride';
import StatusCodes from '../helpers/statusCodes';
import MESSAGES from '../helpers/messages';
import handleErrorMessages from '../handlers/handleErrorMessage';

const ridesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { customer_id, driver_id } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: MESSAGES.RIDE_BAD_REQUEST,
        error_code: MESSAGES.INVALID_DATA,
        error_description: errors.array()[0].msg,
      });
      return;
    }
    const result = await rideService.getRidesByCustomerId({
      customer_id: String(customer_id),
      driver_id: Number(driver_id),
    });
    if (typeof result === 'string') {
      const { status, json } = handleErrorMessages(result);
      res.status(status).json(json);
    }
    res.status(StatusCodes.OK).json({
      message: MESSAGES.RIDE_SUCCESS,
      response: {
        customer_id: customer_id,
        rides: result,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export default ridesController;
