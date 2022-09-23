import { prisma } from "../utils/prismaClient";

export async function findUserByEmail(email: string) {

    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

export async function findUserById(id: string) {

    return await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            address: true
        }
    });
}



