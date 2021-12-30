import { connection, model, Schema } from "mongoose"

type BusType = {
    description: string,
    licensePlate: string,
    brand: string,
    model: string
}

const schema = new Schema<BusType>({
    description: {type: String, required: true, minlength: 3, maxlength: 25},
    licensePlate: {type: String, required: true, minlength: 8, maxlength: 8, unique: true, index: true},
    brand: {type: String, minlength: 3, maxlength: 15},
    model: {type: String, minlength: 3, maxlength: 15}
})

const modelName: string = 'Bus';

export const Bus = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<BusType>(modelName, schema);