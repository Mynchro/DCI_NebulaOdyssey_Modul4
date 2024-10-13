import express from "express";
import { showUserList } from "../controllers/overviewController.js";

const router = express.Router();

router.get("/overview", showUserList);

export default router;
