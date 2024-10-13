import { connectToDB, closeDB } from "../libs/db.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const deleteUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    await connectToDB();

    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(404).json({ message: "User existiert nicht!" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Das eingegebene Passwort ist falsch" });
    }

    await User.deleteOne({ _id: existingUser._id });

    return res.status(200).json({ message: "User erfolgreich gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen des Benutzers.", error);
    res.status(500).json({ message: "Fehler beim Abrufen der Daten." });
  } finally {
    await closeDB();
  }
};
