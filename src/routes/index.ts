import { Router } from "express";
import user from './user'
import login from './login'

const routes = Router()

routes.use('/', user)
routes.use('/', login)


export default routes