import bcrypt from "bcrypt";
import User from "../models/User.js";
import { connectToDB, closeDB } from "../libs/db.js";
import { buildingSchema } from "../models/Buildings.js";

// user-registration

export const register = async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;

  // check if password and confirmPassword match

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Die Passwörter stimmen nicht überein!" });
  }

  // check password-safety with regex

  const isPasswordStrong = (password) => {
    const passwordRequirements =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/; // Mindestens 8 Zeichen, mindestens 1 Kleinbuchstabe, 1 Großbuchstabe, 1 Zahl und 1 Sonderzeichen
    return passwordRequirements.test(password);
  };

  if (!isPasswordStrong(password)) {
    return res.status(400).json({
      message:
        "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.",
    });
  }

  try {
    // connect to db

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
      //   homePlanet: {
      //     ressources: { silicon: 50, ores: 100, energy: 5000 },
      //     buildings: [
      //       { buildingType: "Mine", level: 1 },
      //       { buildingType: "Ammofactory", level: 0 },
      //       { buildingType: "Fuelfactory", level: 0 },
      //       { buildingType: "Solarplant", level: 1 },
      //       { buildingType: "Powerplant", level: 0 },
      //       { buildingType: "Refinery", level: 0 },
      //       { buildingType: "Junkyard", level: 0 },
      //       { buildingType: "Recycler", level: 0 },
      //       { buildingType: "Spycenter", level: 0 },
      //       { buildingType: "smallShipyard", level: 0 },
      //       { buildingType: "mediumShipyard", level: 0 },
      //       { buildingType: "largeShipyard", level: 0 },
      //       { buildingType: "Fueldepot", level: 0 },
      //       { buildingType: "Oredepot", level: 0 },
      //       { buildingType: "Chemicaldepot", level: 0 },
      //       { buildingType: "Ammodepot", level: 0 },
      //       { buildingType: "Steeldepot", level: 0 },
      //       { buildingType: "Energystorage", level: 0 },
      //       { buildingType: "Silicondepot", level: 0 },
      //       { buildingType: "Mikrochipdepot", level: 0 },
      //     ],
      //   },
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

// user-login

export const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    await connectToDB();

    // check if user exists in the db
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(400).json({ message: "User existiert nicht!" });
      // user exists? proceed
    }
    // compare password with hash via bcrypt
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Benutzername oder Passwort sind ungültig!" });
    }

    return res.status(200).json({ message: "Login erfolgreich!" });
  } catch (error) {
    console.error("Fehler beim Login:", error);
    return res
      .status(500)
      .json({ message: "Etwas ist schiefgelaufen, probier es nochmal." });
  } finally {
    await closeDB();
  }
};
