import express from "express";
import { deleteUser } from "../controllers/deleteUser.js";

const router = express.Router();

router.delete("/delete-user", deleteUser);

export default router;
