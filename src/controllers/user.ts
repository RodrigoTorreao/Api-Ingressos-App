import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/customError";
import { UserModel } from "../models/User"
import { EventosModel } from "../models/Eventos";




const eventoUsuario = async(req:any, res:Response, next:NextFunction) =>{
    try{
    const eventos = await UserModel.findOne({name:req.user.name}).select('eventos')
    res.json(eventos)
    }
    catch(error){
        next(error)
    }
}


const adicionarEvento = async(req:any, res:Response, next:NextFunction) => {
    try{
    const evento = await EventosModel.findOne({name:req.body.name})
    const user = await UserModel.findOneAndUpdate({ name: req.user.name }, {$push: {eventos: evento}})
    
    res.json({msg:'Evento adicionado!'})
    }
    
    catch(error){
        next(error)
    }

}



export {eventoUsuario, adicionarEvento}