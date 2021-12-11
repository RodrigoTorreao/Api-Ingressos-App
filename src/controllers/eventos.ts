import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/customError";
import { EventosModel } from "../models/Eventos";

const CriarEvento = async(req:any, res:Response, next:NextFunction) =>{
    try{
        //Verifica se empresa
        if(req.user.role != 'empresa'){
            throw new CustomError(401, 'Somente empresas podem criar eventos')
        }
        
        req.body.empresa = req.user.name

        const evento = await EventosModel.create(req.body)
        res.status(201).json({msg:'Criado'})

    }
    catch(error){
        next(error)
    }
}


const verEventos = async (req:Request, res:Response) => {
    let params = {}
    if(req.query.name){
    params = {name: req.query.name}
   }
   const eventos = await EventosModel.find(params)
   res.json(eventos)


}

const modificarEvento = async (req:any, res:Response, next:NextFunction) =>{
    try{
        if(!req.query.name){
            throw new CustomError(400, 'Favor inserir nome')
        }
        if(req.user.role != 'empresa'){
            throw new CustomError(401, 'Somente empresas podem modificar eventos')
        }

        const evento = await EventosModel.findOneAndUpdate({name:req.query.name, empresa:req.user.name}, req.body, {new:true, runValidators:true})

        if(!evento){
            throw new CustomError(404, 'Evento nao encontrado')
        }

        
        res.status(200).json(evento)

    }
    catch(error){
        next(error)
    }

}

const deletarEvento = async (req:any, res:Response, next:NextFunction) =>{
    try{
        if(!req.query.name){
            throw new CustomError(400, 'Favor inserir nome')
        }
        if(req.user.role != 'empresa'){
            throw new CustomError(401, 'Somente empresas podem deletar eventos')
        }

        const evento = await EventosModel.findOneAndDelete({name:req.query.name, empresa:req.user.name}, req.body)

        if(!evento){
            throw new CustomError(404, 'Evento nao encontrado')
        }

        
        res.status(200).json({msg:'Evento deletado'})

    }
    catch(error){
        next(error)
    }

}







export {CriarEvento, verEventos, modificarEvento, deletarEvento}