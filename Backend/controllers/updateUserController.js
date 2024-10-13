import User from "../models/User.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  const { userName, newUserName, newEmail, newPassword } = req.body;

  try {
    const updateData = {};

    // validate new userName
    if (newUserName) {
      const existingUser = await User.findOne({ userName: newUserName });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Benutzername bereits vergeben." });
      }
      updateData.userName = newUserName;
    }

    // validate new email
    if (newEmail) {
      const existingEmail = await User.findOne({ email: newEmail });
      if (existingEmail) {
        return res.status(400).json({ message: "E-Mail bereits vergeben." });
      }
      updateData.email = newEmail;
    }

    // update password
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(
      { userName },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User existiert nicht!" });
    }

    return res.status(200).json({
      message: "Benutzer erfolgreich aktualisiert!",
      user: { userName: updatedUser.userName, email: updatedUser.email },
    });
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Benutzers:", error);
    return res
      .status(500)
      .json({ message: "Etwas ist schiefgelaufen, probier es nochmal." });
  }
};
