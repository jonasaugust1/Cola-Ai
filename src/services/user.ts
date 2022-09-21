import { prisma } from "../utils/prismaClient";
import * as bcrypt from 'bcrypt';
import { User } from "@prisma/client";

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
            id,
        },
    });
}

