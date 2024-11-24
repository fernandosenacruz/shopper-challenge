import { Router, Request, Response, NextFunction } from 'express';
import { getEstimateSchema } from '../validators/estimate/estimateValidator';
import { patchRideConfirmSchema } from '../validators/confirm/rideConfirmValidator';
import { getRidesSchema } from '../validators/rides/ridesValidator';
import rideEstimateController from '../controllers/rideEstimate';
import rideConfirmController from '../controllers/rideConfirm';
import ridesController from '../controllers/rides';

const ride: Router = Router();

ride.post(
  '/ride/estimate',
  getEstimateSchema,
  async (req: Request, res: Response, next: NextFunction) => {
    await rideEstimateController(req, res, next);
  }
);

ride.patch(
  '/ride/confirm',
  patchRideConfirmSchema,
  async (req: Request, res: Response, next: NextFunction) => {
    await rideConfirmController(req, res, next);
  }
);

ride.get(
  '/ride',
  getRidesSchema,
  async (req: Request, res: Response, next: NextFunction) => {
    await ridesController(req, res, next);
  }
);

export default ride;
