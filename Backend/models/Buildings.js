import mongoose from "mongoose";
import ressourceSchema from "./Planet.js";
const { Schema } = mongoose;

const buildingSchema = new Schema({
  buildingType: {
    type: String,
    enum: [
      "Mine",
      "Ammofactory",
      "Fuelfactory",
      "Solarplant",
      "Powerplant",
      "Refinery",
      "Junkyard",
      "Recycler",
      "Spycenter",
      "smallShipyard",
      "mediumShipyard",
      "largeShipyard",
      "Fueldepot",
      "Oredepot",
      "Chemicaldepot",
      "Ammodepot",
      "Steeldepot",
      "Energystorage",
      "Silicondepot",
      "Mikrochipdepot",
    ],
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  productionRate: ressourceSchema,
});

const Building = mongoose.model("Building", buildingSchema);

export default Building;
