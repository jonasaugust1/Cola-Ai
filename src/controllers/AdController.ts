import { Request, Response } from 'express';
import { findAdById } from '../services/ad';
import { findUserById } from '../services/user';
import { prisma } from '../utils/prismaClient';

export class AdController {

    async create(req: Request, res: Response) {

        const body = req.body
        const { userId } = req.params

        try {

            const user = await findUserById(userId)

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' })
            }

            const ad = await prisma.ad.create({
                data: {
                    description: body.description,
                    userId,
                    transaction: body.transaction,
                    price: body.price
                }
            })

            return res.status(201).json(ad)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Houve algum erro inesperado.' })
        }
    }

    async listAll(req: Request, res: Response) {

        try {
            const ads = await prisma.ad.findMany({
                include: {
                    categories: true
                }
            })
            return res.json(ads)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Houve algum erro inesperado.' })
        }
    }

    // async edit(req: Request, res: Response) {

    //     const {id} = req.params
    //     const {categoryId, ...ad} = req.body

    //     try {
    //         const updatedAd = await prisma.ad.update({
    //             data: {

    //             }
    //         })

    //     } catch (error) {
            
    //     }
    // }
}