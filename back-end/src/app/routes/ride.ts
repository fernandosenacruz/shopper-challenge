import { Router } from 'express';
import rideController from '../controllers/ride';

const ride: Router = Router();

ride.post('/ride/estimate', rideController);

export default ride;
