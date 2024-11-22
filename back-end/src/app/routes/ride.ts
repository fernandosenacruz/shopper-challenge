import { Router, Request, Response, NextFunction } from 'express';
import { getEstimateSchema } from '../validators/estimate/estimateValidator';
import { postRideConfirmSchema } from '../validators/confirm/rideConfirmValidator';
import rideEstimateController from '../controllers/rideEstimate';
import rideConfirmController from '../controllers/rideConfirm';

const ride: Router = Router();

ride.post(
  '/ride/estimate',
  getEstimateSchema,
  async (req: Request, res: Response, next: NextFunction) => {
    await rideEstimateController(req, res, next);
  }
);

ride.post(
  '/ride/confirm',
  postRideConfirmSchema,
  async (req: Request, res: Response, next: NextFunction) => {
    await rideConfirmController(req, res, next);
  }
);

export default ride;
