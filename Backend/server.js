import express from "express";
import { connectToDB } from "./libs/db.js";
import userRoute from "./routes/userRoute.js";
import User from "./models/User.js";
import interfaceRoute from "./routes/interfaceRoute.js";
import adminRoute from "./routes/adminRoute.js";

const port = 3000;
const app = express();

//Middleware
app.use(express.json());

const startServer = async () => {
  try {
    await connectToDB();
    app.use("/admin", adminRoute);
    app.use("/user", userRoute);
    app.use("/api", interfaceRoute);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      calculateResources();
    });
  } catch (error) {
    console.error("Fehler beim Starten des Servers:", error);
  }
};

async function calculateResources() {
  setInterval(async () => {
    try {
      const users = await User.find().populate("homePlanet.buildings");

      for (const user of users) {
        let totalProduction = {
          silicon: 0,
          ores: 0,
          chemicals: 0,
          fuel: 0,
          energy: 0,
          steel: 0,
          electronics: 0,
          ammo: 0,
        };

        for (const building of user.homePlanet.buildings) {
          const productionMultiplier = 1 + building.level * 0.1;

          totalProduction.silicon +=
            building.productionRate.silicon * productionMultiplier;

          totalProduction.ores +=
            building.productionRate.ores * productionMultiplier;

          totalProduction.chemicals +=
            building.productionRate.chemicals * productionMultiplier;

          totalProduction.fuel +=
            building.productionRate.fuel * productionMultiplier;

          totalProduction.energy +=
            building.productionRate.energy * productionMultiplier;

          totalProduction.steel +=
            building.productionRate.steel * productionMultiplier;

          totalProduction.electronics +=
            building.productionRate.electronics * productionMultiplier;

          totalProduction.ammo +=
            building.productionRate.ammo * productionMultiplier;
        }

        // Füge die Gesamtproduktion zu den resourcen des Home-Planeten hinzu
        user.homePlanet.resources.silicon += totalProduction.silicon;

        user.homePlanet.resources.ores += totalProduction.ores;

        user.homePlanet.resources.chemicals += totalProduction.chemicals;

        user.homePlanet.resources.fuel += totalProduction.fuel;

        user.homePlanet.resources.energy += totalProduction.energy;

        user.homePlanet.resources.steel += totalProduction.steel;

        user.homePlanet.resources.electronics += totalProduction.electronics;

        user.homePlanet.resources.ammo += totalProduction.ammo;

        // Speichere die aktualisierten resourcen
        await user.save();
      }

      console.log("Ressourcen wurden erfolgreich aktualisiert.");
    } catch (error) {
      console.error("Fehler bei der Ressourcenberechnung:", error);
    }
  }, 30000); // alle 30 Sekunden ausführen
}

startServer();
