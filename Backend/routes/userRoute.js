import express from "express";
import { register, login } from "../controllers/userController.js";
import { showUserList } from "../controllers/overviewController.js";
import { updateUser } from "../controllers/updateUserController.js";
import { deleteUser } from "../controllers/deleteUserController.js";

const router = express.Router();

router.get("/overview", showUserList);

router.post("/register", register);
router.post("/login", login);

router.patch("/update-user", updateUser);

router.delete("/delete-user", deleteUser);

export default router;
