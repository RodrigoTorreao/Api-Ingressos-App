import { auth } from "../middleware/auth"
import { Router } from "express";
import { CriarEvento, verEventos, modificarEvento, deletarEvento} from "../controllers/eventos";

const eventosRouter = Router()

eventosRouter.route('/').post(auth, CriarEvento).get(verEventos).patch(auth, modificarEvento).delete(auth, deletarEvento)


export{eventosRouter}