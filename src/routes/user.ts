import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { findUserByEmail } from '../services/user';
import { prisma } from '../utils/prismaClient';

const router = express.Router();

router.post('/user', async (req: Request, res: Response) => {

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


    } catch (error) {
        res.status(500)
        throw new Error('Houve algum problema inesperado.')
    }
})



