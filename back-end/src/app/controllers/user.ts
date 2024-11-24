import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import StatusCodes from '../helpers/statusCodes';
import MESSAGES from '../helpers/messages';
import userService from '../services/user';
import handleErrorMessages from '../handlers/handleErrorMessage';

const userController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: MESSAGES.RIDE_BAD_REQUEST,
        error_code: MESSAGES.INVALID_DATA,
        error_description: errors.array()[0].msg,
      });
      return;
    }
    const result = await userService.getUserById({ id: String(id) });
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

export default userController;
