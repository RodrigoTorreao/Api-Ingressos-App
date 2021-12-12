import { auth } from "../middleware/auth"
import { Router } from "express";
import { eventoUsuario, adicionarEvento, jaComprou, pagamento} from "../controllers/user";

const userRouter = Router()



userRouter.route('/').get(auth, eventoUsuario).post(auth, jaComprou, pagamento)


export{userRouter}