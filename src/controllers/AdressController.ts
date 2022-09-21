import { prisma } from './../utils/prismaClient';
import { Request, Response } from "express";
import { findUserByEmail, findUserById } from "../services/user";

export class AddressController {

    async createAddress(req: Request, res: Response) {

        const body = req.body
        const { userId } = req.params

        try {
            const user = await findUserById(userId)

            if (!user) {
                res.status(404)
                throw new Error('Usuário não encontrado')
            }

            const address = await prisma.address.create({
                data: {
                    userId: user.id,
                    zip_code: body.zip_code,
                    street: body.address,
                    district: body.district,
                    state: body.state,
                    country: body.country,
                }
            })

            return res.status(201).json(address)

        } catch (error) {
            res.status(500)
            throw new Error('Houve algum erro inesperado.')
        }
    }

    async editAddress(req: Request, res: Response) {

        const { id } = req.params

        const body = req.body

        try {

            const address = await findUserById(id)

            if (!address) {
                res.status(404)
                throw new Error('Usuário não encontrado')
            }

            const editedAddress = prisma.address.update({
                where: {
                    id
                },
                data: {
                    zip_code: body.zip_code,
                    street: body.address,
                    district: body.district,
                    state: body.state,
                    country: body.country,
                }
            })

            res.status(204).json(editedAddress)
        } catch (error) {
            console.log(error)
            res.status(500)
            throw new Error('Houve algum erro inesperado.')
        }
    }
}