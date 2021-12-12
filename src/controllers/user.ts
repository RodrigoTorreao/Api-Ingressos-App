import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/customError";
import { UserModel } from "../models/User"
import { EventosModel } from "../models/Eventos";
import Stripe from "stripe";



const eventoUsuario = async(req:any, res:Response, next:NextFunction) =>{
    try{
    const eventos = await UserModel.findOne({name:req.user.name}).select('eventos')
    
    res.json(eventos)
    }
    catch(error){
        next(error)
    }
}


const adicionarEvento = async(params:{user:string, evento:string}) => {
    try{
        const evento = await EventosModel.findOne({name:params.evento,})
    
    if(!evento){
        throw new CustomError(400, 'Evento nao encontrado')
    }
  
    const user = await UserModel.findOneAndUpdate({ name: params.user}, {$push: {eventos: evento}})
    }
    
    catch(error){
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





const pagamento = async(req:any, res:Response, next:NextFunction) => {
    try{
        const evento = await EventosModel.findOne({name:req.body.name}) 
       
        if(!evento){
            throw new CustomError(400, 'Evento nao encontrado')
        }

        const preco = Math.ceil(evento.preco * 100 )
        const stripe = new Stripe(`${process.env.STRIPE_KEY}`, {apiVersion: '2020-08-27'})
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            payment_intent_data: {
                metadata: {
                    user: req.user.name,
                    evento: req.body.name
                }
            },
            cancel_url: `https://mblabs.com.br/`,
            success_url:`https://mblabs.com.br/`,
            line_items:[{price_data:{
                currency:'brl',
                product_data:{
                    name: req.body.name
                },
                unit_amount: preco
            },
                quantity:1
            }],

           })
           res.status(200).json({link:session.url})

    }
    catch(error){
        next(error)
    }
}




export {eventoUsuario, adicionarEvento, jaComprou, pagamento}