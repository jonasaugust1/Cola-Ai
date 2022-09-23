import { Router} from 'express';
import { UserController } from '../controllers/UserController';
import { checkAuth } from '../middleware/checkAuth';

const routes = Router();

routes.post('/user', new UserController().createUser)

routes.get('/user', checkAuth, new UserController().listAllUsers)
routes.get('/user/:id', checkAuth, new UserController().listById)
routes.get('/user/:email', checkAuth, new UserController().listByEmail)
routes.get('/user/:id/posts', checkAuth, new UserController().listUserAds)

routes.delete('/user/:id', checkAuth, new UserController().deleteUser)

export default routes


