import { prisma } from "../utils/prismaClient";

export async function findAdById(id: string) {

    return await prisma.ad.findUnique({
        where: {
            id,
        }
    });
}