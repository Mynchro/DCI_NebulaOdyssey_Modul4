import Planet from "../models/Planet.js";
import { Resource } from "../models/Resources.js";
import Building from "../models/Buildings.js";

export const createHomeplanet = async (userId) => {
  try {
    const defaultBuildings = await Building.find();
    const defaultResources = await Resource.findOne();

    if (!defaultResources || !defaultBuildings) {
      throw new Error(
        "Keine Ressourcen oder Gebäude in der Datenbank gefunden!"
      );
    }

    const newPlanet = new Planet({
      owner: userId,
      name: "Nebula",
      buildings: defaultBuildings.map((building) => building._id),
      resources: defaultResources._id,
    });

    await newPlanet.save();

    console.log("Heimatplanet erfolgreich erstellt!");
    return newPlanet;
  } catch (error) {
    console.error("Fehler beim Erstellen des Planeten:", error);
  }
};
