import {Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import 'dotenv/config'
import { findUserById } from "../services/user";

type JwtPayload = {
    id: string
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401)
        throw new Error("Não autorizado")
    }

    const token = authorization.split(" ")[1]

    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload

    const user = await findUserById(id)

    if (!user) {
        res.status(404)
        throw new Error('Usuário não encontrado')
    }

    const { password: _, ...loggedUser } = user

    res.send(loggedUser)
    next()
}
