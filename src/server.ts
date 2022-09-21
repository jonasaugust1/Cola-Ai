import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';


const app = express();

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient();

app.post('/')


app.listen(3333, () => {
    console.log('The application is running on port 3333')
})