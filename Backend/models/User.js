import mongoose from "mongoose";
import resourceSchema from "./Resources.js";
import { buildingSchema } from "./Buildings.js";
const { Schema } = mongoose;

// Define the homePlanet schema with default resources and buildings
const homePlanetSchema = new Schema({
  planetName: { type: String, default: "Nebula Zero" },
  resources: {
    type: resourceSchema,
    default: {
      silicon: 50,
      ores: 100,
      energy: 5000,
    },
  },
  buildings: {
    type: [buildingSchema], // Array von Gebäuden im Homeplanet
    default: [],
  },
});

// Define the user schema
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  homePlanet: {
    type: homePlanetSchema, // Verknüpfe das homePlanetSchema hier
    default: () => ({
      planetName: "Nebula Zero",
      resources: {
        silicon: 50,
        ores: 100,
        energy: 5000,
      },
      buildings: [
        {
          buildingType: "Mine",
          level: 1,
          productionRate: {
            silicon: 100,
            ores: 200,
            chemicals: 100,
            fuel: 0,
            energy: -25,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Ammofactory",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: -25,
            fuel: 0,
            energy: -100,
            steel: -50,
            electronics: 0,
            ammo: 50,
          },
        },
        {
          buildingType: "Fuelfactory",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: -50,
            fuel: 100,
            energy: -25,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Solarplant",
          level: 1,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 100,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Powerplant",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: -100,
            energy: 250,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Refinery",
          level: 0,
          productionRate: {
            silicon: -100,
            ores: -200,
            chemicals: 0,
            fuel: 0,
            energy: -50,
            steel: 200,
            electronics: 100,
            ammo: 0,
          },
        },
        {
          buildingType: "Junkyard",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Recycler",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: -50,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Spycenter",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: -50,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "smallShipyard",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "mediumShipyard",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "largeShipyard",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Fueldepot",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Oredepot",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Chemicaldepot",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Ammodepot",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Steeldepot",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Energystorage",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Silicondepot",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
        {
          buildingType: "Mikrochipdepot",
          level: 0,
          productionRate: {
            silicon: 0,
            ores: 0,
            chemicals: 0,
            fuel: 0,
            energy: 0,
            steel: 0,
            electronics: 0,
            ammo: 0,
          },
        },
      ],
    }),
  },
  planets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Planet",
      default: [],
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
