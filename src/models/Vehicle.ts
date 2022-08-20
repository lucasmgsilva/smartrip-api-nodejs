import { connection, model, Schema } from "mongoose"

type VehicleType = {
    description: string,
    licensePlate: string,
    type: 'bus' | 'micro_bus' | 'van'
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
    type: {
        type: String, 
        trim: true, 
        required: true, 
        enum: [
            'bus', 
            'micro_bus', 
            'van'
        ]
    }
})

const modelName: string = 'Vehicle';

export const Vehicle = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<VehicleType>(modelName, schema);