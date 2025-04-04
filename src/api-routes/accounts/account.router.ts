import express from "express";
import { checkAuth } from "@/middleware/checkAuth";
import * as AccountController from "./account.controller";

const router = express.Router();

router.get("/:id", checkAuth, AccountController.GetProfile);

export default router;