import { NextFunction, Request, Response } from "express"
import { CustomError } from "../error/customError"
import { UserModel } from "../models/User"
import {compare, genSalt, hash} from 'bcryptjs'
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



const login = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {name, password} = req.body
        if(!name || !password){
            throw new CustomError(400, 'Favor inserir nome e senha')
        }
        
        //Busca Usuario
        const user = await UserModel.findOne({name})
        if(!user){
            throw new CustomError(401, 'Credenciais invalidas')
        }
        
        //Compara Senha
        const isMatch = await compare(password, user.password)
        if(!isMatch){
            throw new CustomError(401, 'Credenciais invalidas')
        }

        const token = sign({name:user.name, role:user.role}, `${process.env.JWT_SECRET}`, {expiresIn:'30d'})
        res.status(200).json({nome:user.name, eventos:user.eventos, jwt:token})
    }
    catch(error){
        next(error)
    }
}

export{register, login}