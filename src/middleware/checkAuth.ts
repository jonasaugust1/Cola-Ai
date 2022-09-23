import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import 'dotenv/config'
import { findUserById } from "../services/user";

type JwtPayload = {
    id: string
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ message: 'Não autorizado' })
    }

    const token = authorization.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: 'Não autorizado' })
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload

        const user = await findUserById(id)

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        next()
    } catch (error: unknown) {
        let message
        if(error instanceof Error) {
            message = error.message
        } else {
            message = error
        }
        return res.status(401).json({message})
    }
}