import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../helpers/statusCodes';
import MESSAGES from '../helpers/messages';
import handleErrorMessages from '../handlers/handleErrorMessage';
import driverService from '../services/driver';

const driverController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await driverService.getDrivers();
    if (typeof result === 'string') {
      const { status, json } = handleErrorMessages(result);
      res.status(status).json(json);
    }

    res.status(StatusCodes.OK).json({
      message: MESSAGES.USER_SUCCESS,
      response: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export default driverController;
