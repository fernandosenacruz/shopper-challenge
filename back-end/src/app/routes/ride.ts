import { Router, Request, Response, NextFunction } from 'express';
import rideController from '../controllers/ride';
import { getEstimateSchema } from '../validators/estimate/estimateValidator';

const ride: Router = Router();

ride.post(
  '/ride/estimate',
  getEstimateSchema,
  async (req: Request, res: Response, next: NextFunction) => {
    await rideController(req, res, next);
  }
);

export default ride;
