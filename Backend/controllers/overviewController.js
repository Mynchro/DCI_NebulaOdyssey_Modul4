import User from "../models/User.js";

export const showUserList = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "Es liegen keine Dokumente vor." });
    }

    const showEmail = req.query.showEmail === "true";

    const result = users.map((user) => {
      const userData = { userName: user.userName };
      if (showEmail) {
        userData.email = user.email;
      }
      return userData;
    });

    res.status(200).json({
      message: "Die Kollektion users enthält folgende Benutzer:",
      users: result,
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten.", error);
    res.status(400).json({ message: "Fehler beim Abrufen der Daten." });
  }
};
