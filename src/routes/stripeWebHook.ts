import { Router } from "express";
import { eventHandler } from "../controllers/stripeWebHook";

const stripeRouter = Router()

stripeRouter.post('/', eventHandler)

export{stripeRouter}