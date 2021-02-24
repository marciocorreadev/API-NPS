import "reflect-metadata";
import "./database"
import express, { Request, Response } from 'express';

const app = express();


app.get('/users', (req: Request, res: Response) => {

})

app.listen(3333, () => {
    console.log('Server is running!');
});