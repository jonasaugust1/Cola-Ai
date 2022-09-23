import { AdController } from './../controllers/AdController';
import {Router} from 'express';
import { checkAuth } from '../middleware/checkAuth';

const routes = Router()

routes.post('/add/:userId', checkAuth, new AdController().create)

routes.get('/add', checkAuth, new AdController().listAll)
// routes.put('/address/:id/:userId', checkAuth, new AddressController().edit)

export default routes