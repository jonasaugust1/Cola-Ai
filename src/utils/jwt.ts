import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { User } from '@prisma/client';

export function generateAccessToken(user: User) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
    })
}


