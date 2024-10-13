import express from "express";
import { updateUser } from "../controllers/updateUserController.js";

const router = express.Router();

router.patch("/update-user", updateUser);

export default router;
