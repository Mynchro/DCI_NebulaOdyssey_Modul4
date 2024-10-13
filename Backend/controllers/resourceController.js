import User from "../models/User.js";

export const getUserResources = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("Benutzer nicht gefunden!");
        }

        const ressources = user.homePlanet.ressources;

        return res.status(200).json(ressources);
    } catch (error) {
        console.error("Fehler beim Abrufen der Ressourcen", error);
        return res.status(500).send("Serverfehler");
    }
};
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/resources für abfrufen aller Gebäude
