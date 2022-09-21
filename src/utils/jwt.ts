import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { User } from '@prisma/client';

export function generateAccessToken(user: User) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    })
}

export function generateRefreshToken(user: User, jti: string) {
    return jwt.sign({
        userId: user.id,
        jti
    }, process.env.JWT_REFRESH_SECRET as string, {
        expiresIn: '8h',
    });
}

export function generateTokens(user: User, jti: string) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken,
    };
}

