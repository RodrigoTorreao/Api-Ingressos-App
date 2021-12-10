import { resolveSoa } from "dns"
import { NextFunction, Request, Response } from "express"
import { CustomError } from "../error/customError"
import { UserModel } from "../models/User"



const register =async (req:Request, res:Response, next:NextFunction) => {
    try{
    const {name, password, role} = req.body
    if(!name || !password){
        throw new CustomError(400, 'Favor inserir nome e senha')
    }
    console.log(role)
    const user = await UserModel.create({...req.body})

    res.status(201).json({msg:'OK'})
    }
    catch(error){
        next(error)
    }
 
    
}

const login =async (req:Request, res:Response) => {
    
}

export{register, login}