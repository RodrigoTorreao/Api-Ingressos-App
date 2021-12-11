import { Schema, model, Date } from "mongoose"



interface Eventos {
    name: string;
    info: string
    preco: number
    empresa:string
    data: any
  }

const schema = new Schema<Eventos>({
    name: {type: String, required:[true, 'Nome não informando'], unique:true},
    info: {type: String, default:''},
    preco: {type: Number, required:[true, 'Preço não informando']},
    empresa: {type: String, required:[true, 'Empresa não informanda']},
    data:{type: Date, required:[true, 'Data não informanda']},
});


const EventosModel = model<Eventos>('Eventos', schema)


export{EventosModel}