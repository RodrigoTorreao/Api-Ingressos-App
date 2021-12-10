import { Schema, model } from "mongoose"



interface User {
    name: string;
    password: string
    role?: string;
    eventos: Object[]
  }

const schema = new Schema<User>({
    name: { type: String, required:[true, 'Nome não informando'], unique:true},
    password: { type: String, required:[true, 'Senha não informada']},
    role: { type: String, enum: ['empresa', 'usuario'], default:'usuario' },
    eventos:[{type: Object }]
});

const UserModel = model<User>('User', schema)

export{UserModel}