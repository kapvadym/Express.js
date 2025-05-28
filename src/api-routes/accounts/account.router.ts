import express from "express";
import { checkAuth } from "@/middleware/checkAuth";
import * as AccountController from "./account.controller";

const router = express.Router();

router.get("/", checkAuth, AccountController.getAll);
router.get("/me", checkAuth, AccountController.getMe);
router.get("/:id", AccountController.getProfile);
router.delete("/me/delete", checkAuth, AccountController.deleteAccount)


export default router;