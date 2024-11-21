import { NextFunction, Request, Response } from 'express';
import rideEstimate from '../services/rideEstimate';
import rideService from '../services/ride';
import geocodingService from '../services/geocode';
import { validationResult } from 'express-validator';
import StatusCodes from '../helpers/statusCodes';
import MESSAGES from '../helpers/messages';

const rideController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { origin, destination } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: MESSAGES.RIDE_BAD_REQUEST,
        error_code: MESSAGES.INVALID_DATA,
        error_description: errors.array()[0].msg,
      });
      return;
    }

    const geocodeOrigin = await geocodingService(origin);
    if (geocodeOrigin.error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: MESSAGES.GEOCODE_ERROR,
        error_code: MESSAGES.INVALID_DATA,
        error_description: geocodeOrigin.error,
      });
      return;
    }

    const geocodeDestination = await geocodingService(destination);
    if (geocodeDestination.error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: MESSAGES.GEOCODE_ERROR,
        error_code: MESSAGES.INVALID_DATA,
        error_description: geocodeDestination.error,
      });
      return;
    }

    const { distanceMeters, durationSeconds } = await rideEstimate(
      geocodeOrigin,
      geocodeDestination
    );

    const options = await rideService(distanceMeters);

    const response = {
      origin: geocodeOrigin,
      destination: geocodeDestination,
      distance: distanceMeters,
      duration: durationSeconds,
      options,
      routeResponse: { distanceMeters, durationSeconds },
      message: MESSAGES.RIDE_SUCCESS,
    };

    res.status(StatusCodes.OK).json({ response });
  } catch (error: any) {
    next(error);
  }
};

export default rideController;
