import { prisma } from "../utils/prismaClient";

export async function findCategoryById(id: string) {

    return await prisma.category.findUnique({
        where: {
            id,
        }
    });
}