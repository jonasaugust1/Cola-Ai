import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { findUserByEmail } from '../services/user';
import { prisma } from '../utils/prismaClient';
import * as bcrypt from 'bcrypt';
import { generateAccessToken } from '../utils/jwt';
import { checkIfUnencryptedPasswordIsValid } from '../services/auth';
import { hashToken } from '../utils/hashToken';

export class AuthController {

    async login(req: Request, res: Response) {

        const { email, password } = req.body

        try {
            const user = await findUserByEmail(email)

            if (!user) {
                res.status(404)
                throw new Error('Usuário não encontrado.')
            }

            const verifyPass = await bcrypt.compare(password, user.password)

            if (!verifyPass) {
                res.status(400)
                throw new Error('Usuário ou senha inválidos')
            }

            const token = generateAccessToken(user)

            const { password: _, ...userLogin } = user

            return res.status(201).json({
                user: userLogin,
                token: token
            })
        } catch (error) {
            res.status(500)
            throw new Error('Houve algum erro inesperado')
        }
    }

    static changePassword = async (req: Request, res: Response) => {

        // const id = res.locals.jwtPayload.idUser
        const { oldPassword, newPassword, email } = req.body

        if (!(oldPassword || newPassword)) {
            res.status(400)
            throw new Error('Os campos precisam ser preenchidos')
        }

        try {
            const user = await findUserByEmail(email)

            if (!user) {
                res.status(404)
                throw new Error('Usuário não encontrado')
            }

            const uncryptedPasswordIsValid = checkIfUnencryptedPasswordIsValid(oldPassword, newPassword)

            if (!uncryptedPasswordIsValid) {
                res.status(400)
                throw new Error('As senhas não coincidem')
            }

            prisma.user.update({
                where: {
                    email
                },
                data: {
                    password: hashToken(newPassword) 
                }
            })

            res.status(204).send("Password changed")
        } catch (error) {
            res.status(500)
            throw new Error('Houve algum erro inesperado')
        }
    }
}