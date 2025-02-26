import { Router } from "express";
import { TwitService } from "./twit.service.js";

const router = Router()

const twitsService = new TwitService()

router.post('/', (req, res) => {
  const twit = twitsService.createTwit(req.body)
  res.status(201).json(twit)
})

export const twitRouter = router
