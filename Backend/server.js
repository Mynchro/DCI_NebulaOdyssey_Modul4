import express from "express";
import { connectToDB } from "./libs/db.js";
import { Planet } from "./models/Planet.js";
import Building from "./models/Buildings.js";

const app = express();
app.use(express.json());

const port = 3000;

await connectToDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    calculateResources();
});

async function calculateResources() {
    /// Dummy ---------------------------------------------------------------------------------------------
    const dummyPlanet = {
        name: "TestPlanet",
        ressources: {
            silicon: 100,
            ores: 200,
            chemicals: 300,
            fuel: 400,
            energy: 500,
            steel: 600,
            electronics: 700,
            ammo: 800,
        },
        buildings: [
            {
                productionRate: {
                    silicon: 10,
                    ores: 20,
                    chemicals: 30,
                    fuel: 40,
                    energy: 50,
                    steel: 60,
                    electronics: 70,
                    ammo: 80,
                },
            },
            {
                productionRate: {
                    silicon: 5,
                    ores: 10,
                    chemicals: 15,
                    fuel: 20,
                    energy: 25,
                    steel: 30,
                    electronics: 35,
                    ammo: 40,
                },
            },
        ],
    };
    /// Dummy ---------------------------------------------------------------------------------------------

    setInterval(async () => {
        try {
            //const planets = await Planet.find().populate("buildings"); // einkommentieren wenn Dummy weg fällt

            //for (const planet of planets) { // einkommentieren wenn Dummy weg fällt
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

            for (const building of dummyPlanet.buildings) {
                // dummy durch Planet ersetzen wenn dummyPlanet weg fällt
                const {
                    silicon,
                    ores,
                    chemicals,
                    fuel,
                    energy,
                    steel,
                    electronics,
                    ammo,
                } = building.productionRate;
                totalProduction.silicon += silicon;
                totalProduction.ores += ores;
                totalProduction.chemicals += chemicals;
                totalProduction.fuel += fuel;
                totalProduction.energy += energy;
                totalProduction.steel += steel;
                totalProduction.electronics += electronics;
                totalProduction.ammo += ammo;
            }

            dummyPlanet.ressources.silicon += totalProduction.silicon; // dummy durch Planet ersetzen wenn dummyPlanet weg fällt
            dummyPlanet.ressources.ores += totalProduction.ores; // dummy durch Planet ersetzen wenn dummyPlanet weg fällt
            dummyPlanet.ressources.chemicals += totalProduction.chemicals; // dummy durch Planet ersetzen wenn dummyPlanet weg fällt
            dummyPlanet.ressources.fuel += totalProduction.fuel; // dummy durch Planet ersetzen wenn dummyPlanet weg fällt
            dummyPlanet.ressources.energy += totalProduction.energy; // dummy durch Planet ersetzen wenn dummyPlanet weg fällt
            dummyPlanet.ressources.steel += totalProduction.steel; // dummy durch Planet ersetzen wenn dummyPlanet weg fällt
            dummyPlanet.ressources.electronics += totalProduction.electronics; // dummy durch Planet ersetzen wenn dummyPlanet weg fällt
            dummyPlanet.ressources.ammo += totalProduction.ammo; // dummy durch Planet ersetzen wenn dummyPlanet weg fällt

            //await planet.save(); // einkommentieren wenn Dummy weg fällt
            //} // einkommentieren wenn Dummy weg fällt
            console.log(
                "Aktualisierte Ressourcen des Planeten:",
                dummyPlanet.ressources
            );
            console.log("Ressourcen wurden erfolgreich aktualisiert.");
        } catch (error) {
            console.error("Fehler bei der Ressourcenberechnung:", error);
        }
    }, 5000); // alle 5 Sekunden ausführen
}
