import { Router, Request, Response, NextFunction } from 'express';
import { getUserSchema } from '../validators/user/userValidator';
import userController from '../controllers/user';

const user: Router = Router();

user.get(
  '/customer',
  getUserSchema,
  async (req: Request, res: Response, next: NextFunction) => {
    await userController(req, res, next);
  }
);

export default user;
