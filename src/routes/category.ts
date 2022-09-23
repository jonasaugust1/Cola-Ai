import {Router} from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { checkAuth } from '../middleware/checkAuth';

const routes = Router()

routes.post('/category', checkAuth, new CategoryController().create)
routes.put('/category/:id', checkAuth, new CategoryController().edit)

routes.get('/category', checkAuth, new CategoryController().listAll)

export default routes