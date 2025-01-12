import { Router } from 'express';
import { AuthService } from './AuthService';
import { AuthController } from './AuthController';
import { User } from '../users/User';
import { UserService } from '../users/UserService';
import { createJWT } from '../../utils/jwtFunction';
import { userLoginSchema, userRegisterSchema } from './validation';

const authRouter = Router();
const userService = new UserService(User);
const authService = new AuthService(User, userService, createJWT);
const authController = new AuthController(authService, userRegisterSchema, userLoginSchema);

authRouter.route('/register').post((req, res, next) => authController.register(req, res, next));

authRouter.route('/login').post((req, res, next) => authController.login(req, res, next));

authRouter.route('/logout').get((req, res, next) => authController.logout(req, res, next));

export { authRouter };
