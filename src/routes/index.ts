import { Router } from "express";
import user from './user'
import login from './login'
import address from './address'
import category from './category'
import ad from './ad'

const routes = Router()

routes.use('/', user)
routes.use('/', login)
routes.use('/', address)
routes.use('/', category)
routes.use('/', ad)


export default routes