import bcrypt from "bcrypt";
import User from "../models/User.js";
import { connectToDB, closeDB } from "../libs/db.js";

//Registrierung des Users

export const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    await connectToDB();

    // check existing User

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({
        message: "Username ist bereits vergeben, wähle einen anderen!",
      });
    }

    // hash password with bcrypt

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "Benutzer erfolgreich registriert!" });
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error);
    return res
      .status(500)
      .json({ message: "Serverfehler, versuche es erneut" });
  } finally {
    await closeDB();
  }
};
