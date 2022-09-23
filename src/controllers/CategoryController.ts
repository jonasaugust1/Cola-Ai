import { Request, Response } from 'express';
import { findCategoryById } from '../services/category';
import { prisma } from '../utils/prismaClient';

export class CategoryController {

    async create(req: Request, res: Response) {

        const { name, sub_category } = req.body

        try {
            const category = await prisma.category.create({
                data: {
                    name,
                    sub_category
                }
            })

            return res.status(201).json(category)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Houve algum erro inesperado.' })
        }
    }

    async edit(req: Request, res: Response) {
        const { id } = req.params

        const {name, sub_category} = req.body

        try {

            const category = await findCategoryById(id)

            if (!category) {
                return res.status(404).json({ message: 'Categoria não encontrada' })
            }

            await prisma.category.update({
                where: {
                    id
                },
                data: {
                    name,
                    sub_category
                }
            })

            return res.status(204)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Houve algum erro inesperado.' })
        }
    }

    async listAll(req: Request, res: Response) {

        try {
            const categories = await prisma.category.findMany({
                include: {
                    ads: true
                }
            })
            return res.json(categories)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Houve algum erro inesperado.' })
        }
    }
}