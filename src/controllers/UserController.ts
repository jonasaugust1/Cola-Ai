import { Request, Response } from 'express';
import { findUserByEmail, findUserById } from '../services/user';
import { prisma } from '../utils/prismaClient';
import * as bcrypt from 'bcrypt';

export class UserController {

    async createUser(req: Request, res: Response) {

        const body = req.body

        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json('Você deve fornecer um email e uma senha.')
            }

            const existingUser = await findUserByEmail(email)

            if (existingUser) {
                return res.status(400).json('Email já está em uso.')
            }

            const passwordEncrypted = bcrypt.hashSync(body.password, 10)

            const user = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: passwordEncrypted
                }
            })

            return res.status(201).json(user)

        } catch (error) {
            console.log(error)
            return res.status(500).json('Houve algum problema inesperado.')
        }
    }

    async listAll(req: Request, res: Response) {

        try {
            const users = await prisma.user.findMany({
                include: {address: true}
            })
            return res.json(users)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Houve algum erro inesperado.' })
        }
    }

    async listById(req: Request, res: Response) {

        const { id } = req.params

        try {
            const user = await findUserById(id)

            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado.' })
            }

            return res.json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Houve algum erro inesperado.' })
        }
    }

    async listByEmail(req: Request, res: Response) {

        const { email } = req.params

        try {
            const user = await findUserByEmail(email)

            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado.' })
            }

            return res.json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Houve algum erro inesperado.' })
        }
    }

    async deleteUser(req: Request, res: Response) {

        const { id } = req.params

        try {
            const user = await findUserById(id)

            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado.' })
            }

            const userDeleted = prisma.user.delete({
                where: {
                    id
                }
            })

            return res.status(204)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Houve algum erro inesperado.' })
        }
    }
}

