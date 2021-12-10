import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/customError";



const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again later',
  }

   if (err instanceof CustomError) {
     return res.status(err.code).json({ msg: err.message })
   }

  if (err.code && err.code === 11000) {
    customError.msg = `Valor ja registrado para ${Object.keys(
      err.keyValue
    )}`
    customError.statusCode = 400
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}




export{errorHandler}
