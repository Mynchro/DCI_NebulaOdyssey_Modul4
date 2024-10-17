import Planet from "../models/Planet.js";
import { Resource } from "../models/Resources.js";
import Building from "../models/Buildings.js";

export const createGameworld = async () => {
  try {
    const defaultBuildings = await Building.find();
    const defaultResources = await Resource.findOne();

    if (!defaultResources || !defaultBuildings) {
      throw new Error(
        "Keine Ressourcen oder Gebäude in der Datenbank gefunden!"
      );
    }

    const buildingId = defaultBuildings.map((building) => building._id);
    const resourceId = defaultResources._id;

    const planets = [];
    for (let i = 1; i <= 10; i++) {
      const newPlanet = new Planet({
        owner: null,
        name: `Planet ${i}`,
        buildings: buildingId,
        resources: resourceId,
      });

      planets.push(newPlanet);
    }
    await Planet.insertMany(planets);
    console.log("10 Spielwelt-Planeten erfolgreich erstellt!");
  } catch (error) {
    console.error("Fehler beim Erstellen der Spielwelt-Planeten:", error);
  }
};
