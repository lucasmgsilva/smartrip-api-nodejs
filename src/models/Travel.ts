import { connection, Date, model, Schema } from "mongoose"

type TravelType = {
    trajeto_id: number
    tempoInicio: Date,
    tempoTermino: Date,
    localizacao: [{lat: number, long: number}]
}

const schema = new Schema<TravelType>({
    trajeto_id: {type: Number, required: true},
    tempoInicio: {type: Date, required: true},
    tempoTermino: {type: Date},
    localizacao: {type: [{lat: Number, long: Number}]}
})

const modelName: string = 'Travel';

export const Travel = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<TravelType>(modelName, schema);