import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Deck from "./models/Deck";

const PORT = 8000;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/decks", async (req: Request, res: Response) => {

   const decks = await Deck.find();
   console.log(decks);

   res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const cretedDeck = await newDeck.save();
  res.json(cretedDeck);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening to ${PORT}`);
  app.listen(PORT);
});
