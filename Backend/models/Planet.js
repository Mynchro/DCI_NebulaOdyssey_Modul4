import mongoose from "mongoose";
const { Schema } = mongoose;

const planetSchema = new Schema({
  system: {
    type: Schema.Types.ObjectId,
    ref: "Galaxy",
    required: true,
  },
  position: {
    type: Number,
    required: true,
    min: 1,
    max: 16,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  ressources: {
    silicon: {
      type: Number,
      default: 0,
    },
    ores: {
      type: Number,
      default: 0,
    },
    chemicals: {
      type: Number,
      default: 0,
    },
    fuel: {
      type: Number,
      default: 0,
    },
    energy: {
      type: Number,
      default: 0,
    },
    steel: {
      type: Number,
      default: 0,
    },
    electronics: {
      type: Number,
      default: 0,
    },
    ammo: {
      type: Number,
      default: 0,
    },
  },
  buildings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Building",
    },
  ],
  research: [
    {
      type: Schema.Types.ObjectId,
      ref: "Research",
    },
  ],
  shipyard: [
    {
      type: Schema.Types.ObjectId,
      ref: "Shipyard",
    },
  ],
});

const Planet = mongoose.model("Planet", planetSchema);

export default Planet;
