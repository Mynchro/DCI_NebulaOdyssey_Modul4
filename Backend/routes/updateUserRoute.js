import express from "express";
import { updateUser } from "../controllers/updateUser.js";

const router = express.Router();

router.patch("/update-user", updateUser);

export default router;
