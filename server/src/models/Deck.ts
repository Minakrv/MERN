import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DeckSchemma = new Schema({
  title: String, // String is shorthand for {type: String}
});

const DockModel = mongoose.model("Deck", DeckSchemma);

export default DockModel;