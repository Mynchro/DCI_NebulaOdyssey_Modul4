import express from "express";
import { getUserResources } from "../controllers/resourceController.js";

const router = express.Router();

router.get("/user/:userId/resources", getUserResources);

export default router;
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/resources für abfrufen aller Gebäude
