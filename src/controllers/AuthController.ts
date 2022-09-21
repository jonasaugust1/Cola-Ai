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
                return res.status(404).json('Usuário não encontrado.')
            }

            const verifyPass = await bcrypt.compare(password, user.password)

            if (!verifyPass) {
                return res.status(400).json('Usuário ou senha inválidos')
            }

            const token = generateAccessToken(user)

            const { password: _, ...userLogin } = user

            return res.json({
                user: userLogin,
                token: token
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json('Houve algum erro inesperado.')
        }
    }

    static changePassword = async (req: Request, res: Response) => {

        // const id = res.locals.jwtPayload.idUser
        const { oldPassword, newPassword, email } = req.body

        if (!(oldPassword || newPassword)) {
            return res.status(400).json('Os campos precisam ser preenchidos')
        }

        try {
            const user = await findUserByEmail(email)

            if (!user) {
                return res.status(404).json('Usuário não encontrado')
            }

            const uncryptedPasswordIsValid = checkIfUnencryptedPasswordIsValid(oldPassword, newPassword)

            if (!uncryptedPasswordIsValid) {
                return res.status(400).json('As senhas não coincidem')
            }

            prisma.user.update({
                where: {
                    email
                },
                data: {
                    password: hashToken(newPassword)
                }
            })

            return res.status(204).send("Password changed")
        } catch (error) {
            console.log(error)
            return res.status(500).json('Houve algum erro inesperado.')
        }
    }
}