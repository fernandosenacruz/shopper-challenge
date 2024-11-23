import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import handleErrorMessages, {
  handleErrorRideBadRequest,
} from '../handlers/handleErrorMessage';
import rideEstimate from '../services/rideEstimate';
import rideService from '../services/ride';
import geocodingService from '../services/geocode';
import StatusCodes from '../helpers/statusCodes';
import MESSAGES from '../helpers/messages';

const rideEstimateController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { origin, destination } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { status, json } = handleErrorRideBadRequest(errors.array()[0].msg);
      res.status(status).json(json);
      return;
    }

    const geocodeOrigin = await geocodingService(origin);
    if (geocodeOrigin.error) {
      const { status, json } = handleErrorMessages(geocodeOrigin.error);
      res.status(status).json(json);
      return;
    }

    const geocodeDestination = await geocodingService(destination);
    if (geocodeDestination.error) {
      const { status, json } = handleErrorMessages(geocodeDestination.error);
      res.status(status).json(json);
      return;
    }

    const { distanceMeters, durationSeconds } = await rideEstimate(
      geocodeOrigin,
      geocodeDestination
    );

    const options = await rideService.getRideEstimate({ distanceMeters });

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

export default rideEstimateController;
