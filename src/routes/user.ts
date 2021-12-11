import { auth } from "../middleware/auth"
import { Router } from "express";
import { eventoUsuario, adicionarEvento } from "../controllers/user";

const userRouter = Router()



userRouter.route('/').get(auth, eventoUsuario).post(auth, adicionarEvento)


export{userRouter}