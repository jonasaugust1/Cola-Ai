import { prisma } from './../utils/prismaClient';
import { Request, Response } from "express";
import { findUserByEmail, findUserById } from "../services/user";
import { findAddressById } from '../services/address';

export class AddressController {

    async createAddress(req: Request, res: Response) {

        const body = req.body
        const { userId } = req.params

        try {
            const user = await findUserById(userId)

            console.log(user?.id)
            if (!user) {
                return res.status(404).json({message: 'Usuário não encontrado'})
            }

            const address = await prisma.address.create({
                data: {
                    userId,
                    zip_code: body.zip_code,
                    street: body.street,
                    district: body.district,
                    city: body.city,
                    state: body.state,
                    country: body.country,
                }
            })

            return res.status(201).json(address)

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Houve algum erro inesperado.'})
        }
    }

    async edit(req: Request, res: Response) {

        const { id } = req.params

        const body = req.body

        try {

            const address = await findAddressById(id)

            if (!address) {
                return res.status(404).json({message: 'Endereço não cadastrado cadastrado'})
            }

            await prisma.address.update({
                where: {
                    id
                },
                data: {
                    zip_code: body.zip_code,
                    street: body.street,
                    district: body.district,
                    city: body.city,
                    state: body.state,
                    country: body.country,
                }
            })

            return res.status(204)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Houve algum erro inesperado.'})
        }
    }
}