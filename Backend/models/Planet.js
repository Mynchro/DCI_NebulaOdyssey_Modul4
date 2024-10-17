import mongoose from "mongoose";
import { buildingSchema } from "./Buildings.js";
// import { buildingSchema } from "./Buildings.js";
// import resourceSchema from "./resources.js";
const { Schema } = mongoose;

const planetSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  buildings: [
    {
      original_Building_id: {
        type: Schema.Types.ObjectId,
        ref: "Building",
      },
      buildingSchema,
    },
  ],

  resources: {
    type: Schema.Types.ObjectId,
    ref: "Resource",
  },
});

const Planet = mongoose.model("Planet", planetSchema);

export default Planet;

// Planet X -> Building = leeres Array (default), Owner = null
// User nimmt Planet X ein
// -> if owner = User:
//      planet.buildings populate (? anhand der building-collection, liegt bereits in der DB)
//      owner = user.id
