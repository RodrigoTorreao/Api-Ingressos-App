import { Request, Response } from "express"
import { UserModel } from "../models/User"
import { BadRequestError } from "../errors/badRequest"


const register =async (req:Request, res:Response) => {
    const {name, password, role} = req.body
    if(!name || !password){
        throw new BadRequestError('Favor inserir NOME e SENHA')
    }
    console.log(role)
    //const user = await UserModel.create({...req.body})
    res.status(201).json({msg:'OK'})
}

const login =async (req:Request, res:Response) => {
    
}

export{register, login}