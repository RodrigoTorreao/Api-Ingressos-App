import { NextFunction, Request, Response } from "express"
import { CustomError } from "../error/customError"
import { UserModel } from "../models/User"
import {genSalt, hash} from 'bcryptjs'
import {sign} from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()


const register =async (req:Request, res:Response, next:NextFunction) => {
    try{
    const {name, password, role} = req.body
   
    if(!name || !password){
        throw new CustomError(400, 'Favor inserir nome e senha')
    }
    //Criptografia
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)
    const tempUser = {name:name, role:role, password:hashedPassword }
    const user = await UserModel.create({...tempUser})
    
    //Jwt
    const token = sign({name:user.name, role:user.role}, `${process.env.JWT_SECRET}`, {expiresIn:'30d'})
    res.status(201).json({token:token})
    }
    catch(error){
        next(error)
    }
 
    
}



const login =async (req:Request, res:Response) => {
    
}

export{register, login}