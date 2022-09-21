import {Router} from 'express';
import { AuthController } from '../controllers/AuthController';

const routes = Router();

routes.post('/login', new AuthController().login)

export default routes