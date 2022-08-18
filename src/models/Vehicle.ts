import { connection, model, Schema } from "mongoose"

type VehicleType = {
    description: string,
    licensePlate: string,
    brand?: string,
    model?: string
}

const schema = new Schema<VehicleType>({
    description: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 3, 
        maxlength: 25
    },
    licensePlate: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 8, 
        maxlength: 8, 
        unique: true
    },
    brand: {
        type: String, 
        trim: true, 
        minlength: 3, 
        maxlength: 15
    },
    model: {
        type: String, 
        trim: true, 
        minlength: 3, 
        maxlength: 15
    }
})

const modelName: string = 'Vehicle';

export const Vehicle = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<VehicleType>(modelName, schema);