import { config } from 'dotenv';
config();
import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import Deck from "./models/Deck";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title,
    });
    const cretedDeck = await newDeck.save();
    res.json(cretedDeck)
})

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Listening to ${PORT}`);
    app.listen(PORT);
})
