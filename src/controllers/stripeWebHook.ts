import { Response, NextFunction } from "express"
import { CustomError } from "../error/customError";
import { adicionarEvento } from "./user";



const eventHandler =  (req:any, res:Response, next:NextFunction) => {
    try{
        let event = req.body
        switch (event.type) {
            case 'payment_intent.succeeded':
              const paymentIntent = event.data.object;
              adicionarEvento(paymentIntent.metadata)
              break;
          }
        

    }
    catch(error){

    }
}

export {eventHandler}