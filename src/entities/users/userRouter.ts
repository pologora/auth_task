import { Router } from 'express';
import { UserService } from './UserService';
import { User } from './User';
import { UserController } from './UserController';
import { asyncErrorCatch } from '../../utils/asyncErrorCatch';

const userRouter = Router();
const userService = new UserService(User);
const userController = new UserController(userService);

userRouter
  .route('/')
  .get(asyncErrorCatch((req, res, next) => userController.findMany(req, res, next)))
  .post(asyncErrorCatch((req, res, next) => userController.create(req, res, next)));

userRouter
  .route('/:id')
  .get(asyncErrorCatch((req, res, next) => userController.findOneById(req, res, next)))
  .patch(asyncErrorCatch((req, res, next) => userController.update(req, res, next)))
  .delete(asyncErrorCatch((req, res, next) => userController.remove(req, res, next)));

export { userRouter };
