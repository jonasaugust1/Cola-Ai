import { AddressController } from './../controllers/AdressController';
import {Router} from 'express';
import { checkAuth } from '../middleware/checkAuth';

const routes = Router()

routes.post('/address/:userId', new AddressController().createAddress)
routes.put('/addres/:id', checkAuth, new AddressController().editAddress)

export default routes