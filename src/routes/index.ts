import { Router } from "express";
import user from './user'
import login from './login'
import address from './address'

const routes = Router()

routes.use('/', user)
routes.use('/', login)
routes.use('/', address)


export default routes