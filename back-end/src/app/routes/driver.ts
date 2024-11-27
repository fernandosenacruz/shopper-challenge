import { Router, Request, Response, NextFunction } from 'express';

import driverController from '../controllers/driver';

const driver: Router = Router();

driver.get(
  '/driver',
  async (_req: Request, res: Response, next: NextFunction) => {
    await driverController(_req, res, next);
  }
);

export default driver;
