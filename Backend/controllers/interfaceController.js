import User from "../models/User.js";

export const getUserResources = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden!");
    }

    const resources = user.homePlanet.resources;

    return res.status(200).json(resources);
  } catch (error) {
    console.error("Fehler beim Abrufen der Ressourcen", error);
    return res.status(500).send("Serverfehler");
  }
};
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/resources für abfrufen aller Gebäude

export const upgradeBuilding = async (req, res) => {
  try {
    const { userId, buildingType } = req.params;

    // Finde den Benutzer anhand der ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden");
    }

    // Suche das Gebäude anhand des buildingType im Home-Planeten des Benutzers
    const building = user.homePlanet.buildings.find(
      (b) => b.buildingType === buildingType
    );

    if (!building) {
      return res
        .status(404)
        .send(`Gebäude mit dem Typ ${buildingType} nicht gefunden`);
    }

    if (building.level >= 15) {
      return res.status(400).send("Maximales Level erreicht");
    }

    // Erhöhe das Level um 1
    building.level += 1;

    // Erhöhe die Produktionsrate um 10% pro Level
    const productionIncreaseFactor = 1.1;
    building.productionRate.silicon *= productionIncreaseFactor;
    building.productionRate.ores *= productionIncreaseFactor;
    building.productionRate.chemicals *= productionIncreaseFactor;
    building.productionRate.fuel *= productionIncreaseFactor;
    building.productionRate.energy *= productionIncreaseFactor;
    building.productionRate.steel *= productionIncreaseFactor;
    building.productionRate.electronics *= productionIncreaseFactor;
    building.productionRate.ammo *= productionIncreaseFactor;

    // Speichere den Benutzer mit dem aktualisierten Gebäude
    await user.save();

    return res.status(200).send({
      message: "Gebäude wurde erfolgreich aufgewertet",
      building,
    });
  } catch (error) {
    console.error("Fehler beim Upgraden des Gebäudes:", error);
    return res.status(500).send("Serverfehler");
  }
};

export const downgradeBuilding = async (req, res) => {
  try {
    const { userId, buildingType } = req.params;

    // Finde den Benutzer anhand der ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden");
    }

    // Suche das Gebäude anhand des buildingType im Home-Planeten des Benutzers
    const building = user.homePlanet.buildings.find(
      (b) => b.buildingType === buildingType
    );

    if (!building) {
      return res
        .status(404)
        .send(`Gebäude mit dem Typ ${buildingType} nicht gefunden`);
    }

    if (building.level <= 1) {
      return res
        .status(400)
        .send("Das Level des Gebäudes kann nicht weiter gesenkt werden");
    }

    // Erhöhe das Level um 1
    building.level -= 1;

    // Verringere die Produktionsrate um 10% pro Level
    const productionIncreaseFactor = 0.9;
    building.productionRate.silicon *= productionIncreaseFactor;
    building.productionRate.ores *= productionIncreaseFactor;
    building.productionRate.chemicals *= productionIncreaseFactor;
    building.productionRate.fuel *= productionIncreaseFactor;
    building.productionRate.energy *= productionIncreaseFactor;
    building.productionRate.steel *= productionIncreaseFactor;
    building.productionRate.electronics *= productionIncreaseFactor;
    building.productionRate.ammo *= productionIncreaseFactor;

    // Speichere den Benutzer mit dem aktualisierten Gebäude
    await user.save();

    return res.status(200).send({
      message: "Gebäude wurde erfolgreich heruntergestuft",
      building,
    });
  } catch (error) {
    console.error("Fehler beim Downgraden des Gebäudes:", error);
    return res.status(500).send("Serverfehler");
  }
};

export const getAllBuildings = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User nichst gefunden");
    }

    const buildings = user.homePlanet.buildings;

    return res.status(200).json(buildings);
  } catch (error) {
    console.error("Fehler beim Abrufen der Gebäude:", error);
    return res.status(500).send("Serverfehler");
  }
};

// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/upgrade  für Mine upgrade
// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/downgrade für Mine downgrade
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/buildings für abfrufen aller Gebäude
