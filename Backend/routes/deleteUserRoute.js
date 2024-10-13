import express from "express";
import { deleteUser } from "../controllers/deleteUserController.js";

const router = express.Router();

router.delete("/delete-user", deleteUser);

export default router;
