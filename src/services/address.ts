import { prisma } from "../utils/prismaClient";

export async function findAddressById(id: string) {

    return await prisma.address.findUnique({
        where: {
            id,
        }
    });
}