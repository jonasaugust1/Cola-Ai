import express from 'express';
import cors from 'cors';
import routes from './routes/index';

const app = express();

app.use(express.json())
app.use(cors())

app.use('/', routes)

app.listen(3333, () => {
    console.log('The application is running on port 3333')
})