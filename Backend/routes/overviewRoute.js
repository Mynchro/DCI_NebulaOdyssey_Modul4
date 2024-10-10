import express from "express";
import { showUserList } from "../controllers/overview.js";

const router = express.Router();

router.get("/overview", showUserList);

export default router;
