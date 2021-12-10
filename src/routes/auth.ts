import { Router } from "express";
import { register, login } from "../controllers/auth";

const Authrouter = Router()

Authrouter.post('/register', register)
Authrouter.post('/login', login)


export{Authrouter}