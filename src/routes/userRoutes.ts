import express from "express";
import { createUserHandler } from "../controllers/userController";

const router = express.Router();

router.route("/signup").post(createUserHandler);
export default router;
