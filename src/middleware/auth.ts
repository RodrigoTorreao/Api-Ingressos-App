import { CustomError } from '../error/customError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'


const auth = async (req:any, res:Response, next:NextFunction) => {
    try{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomError(403, 'Autentication failed')
    }
    const token = authHeader.split(' ')[1]
    const payload = verify(token, `${process.env.JWT_SECRET}`)
    req.user = payload
    next()
    }
    catch(error){
        next(error)
    }
}

export {auth}

