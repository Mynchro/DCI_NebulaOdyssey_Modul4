import express from "express";
import { upgradeBuilding } from "../controllers/building.js";

const router = express.Router();

router.get("/user/:userId/building/:buildingType/upgrade", upgradeBuilding);

export default router;
