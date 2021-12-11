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
    
    if(!evento){
        throw new CustomError(400, 'Evento nao encontrado')
    }
    
    const user = await UserModel.findOneAndUpdate({ name: req.user.name }, {$push: {eventos: evento}})
    
    res.json({msg:'Evento adicionado!'})
    }
    
    catch(error){
        next(error)
    }

}


const jaComprou = async(req:any, response:Response, next:NextFunction) => {
    try{
        const  evento = await UserModel.findOne({name:req.user.name}).select('eventos') 
        evento?.eventos.map((evento:any) => {
            if(req.body.name == evento.name){
                throw new CustomError(400, 'Ingresso ja comprado')
            }
        })
        next()
    }
        catch(error){
        next(error)
    }

}





const pagamento = async() => {
    
}




export {eventoUsuario, adicionarEvento, jaComprou}