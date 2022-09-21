import { prisma } from "../utils/prismaClient";
import { hashToken } from "../utils/hashToken";

export function addRefreshTokenToWhitelist({ 
    jti, 
    refreshToken, 
    userId 
}: {
    jti: string, 
    refreshToken: string, 
    userId :string}) {

    return prisma.refreshToken.create({
        data: {
            id: jti,
            hashedToken: hashToken(refreshToken),
            userId
        },
    });
}

export function findRefreshTokenById(id: string) {
    return prisma.refreshToken.findUnique({
        where: {
            id,
        },
    });
}

export function deleteRefreshToken(id: string) {
    return prisma.refreshToken.update({
        where: {
            id,
        },
        data: {
            revoked: true
        }
    });
}

export function revokeTokens(userId: string) {
    return prisma.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    });
}

