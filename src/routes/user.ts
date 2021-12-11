import { auth } from "../middleware/auth"
import { Router } from "express";
import { eventoUsuario, adicionarEvento, jaComprou } from "../controllers/user";

const userRouter = Router()



userRouter.route('/').get(auth, eventoUsuario).post(auth, jaComprou, adicionarEvento)


export{userRouter}