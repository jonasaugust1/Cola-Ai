import { AdController } from './../controllers/AdController';
import {Router} from 'express';
import { checkAuth } from '../middleware/checkAuth';

const routes = Router()

routes.post('/ad/:userId', checkAuth, new AdController().create)

routes.get('/ad', checkAuth, new AdController().listAll)

routes.put('/ad/:id/:categoryId', checkAuth, new AdController().assignCategories)
routes.put('/ad/:id', checkAuth, new AdController().edit)

export default routes