import { Request, Response } from 'express';
import { findUserByEmail, findUserById } from '../services/user';
import { prisma } from '../utils/prismaClient';

export class UserController {

    async createUser(req: Request, res: Response) {

        const body = req.body

        try {
            const { email, password } = req.body

            if (!email || !password) {
                res.status(400)
                throw new Error('Você deve fornecer um email e uma senha.')
            }

            const existingUser = await findUserByEmail(email)

            if (existingUser) {
                res.status(400)
                throw new Error('Email já está em uso.')
            }

            const user = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: body.password
                }
            })

            return res.status(201).json(user)

        } catch (error) {
            res.status(500)
            throw new Error('Houve algum problema inesperado.')
        }
    }

    async listAll(req: Request, res: Response) {

        try {
            const users = await prisma.user.findMany()

            return res.json(users)
        } catch (error) {
            console.log(error)
            return res.status(500).json('Houve algum erro inesperado.')
        }
    }

    async listById(req: Request, res: Response) {

        const { id } = req.params

        try {
            const user = await findUserById(id)

            if (!user) {
                res.status(404)
                throw new Error('Usuário não encontrado.')
            }

            return res.json(user)
        } catch (error) {
            res.status(500)
            throw new Error('Houve algum erro inesperado.')
        }
    }

    async listByEmail(req: Request, res: Response) {

        const { email } = req.params

        try {
            const user = await findUserByEmail(email)

            if (!user) {
                res.status(404)
                throw new Error('Usuário não encontrado.')
            }

            return res.json(user)
        } catch (error) {
            res.status(500)
            throw new Error('Houve algum erro inesperado.')
        }
    }

    async deleteUser(req: Request, res: Response) {

        const { id } = req.params

        try {
            const user = await findUserById(id)

            if (!user) {
                res.status(404)
                throw new Error('Usuário não encontrado.')
            }

            const userDeleted = prisma.user.delete({
                where: {
                    id
                }
            })

            return res.status(204).json(userDeleted)

        } catch (error) {
            res.status(500).send("Houve algum erro inesperado.")
        }
    }
}

