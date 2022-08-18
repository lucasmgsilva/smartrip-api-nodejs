import { connection, model, Schema } from "mongoose"

type Coordinate = {
    lat: number,
    lng: number
}

type StoppingPoint = {
    description: string,
    executionOrder: number,
    coordinates: Coordinate
}

type RouteType = {
    description: string,
    stoppingPoints: [StoppingPoint]
    passengers: [Schema.Types.ObjectId]
}

const CoordinateSchema = new Schema<Coordinate>({
    lat: {
        type: Number, 
        required: true
    },
    lng: {
        type: Number, 
        required: true
    }
})

const StoppingPointSchema = new Schema<StoppingPoint>({
    description: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 3, 
        maxlength: 25
    },
    executionOrder: {
        type: Number,
        required: true
    },
    coordinates: {
        type: CoordinateSchema, 
        required: true
    }
}, {_id: false})

const schema = new Schema<RouteType>({
    description: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 3, 
        maxlength: 45
    },
    stoppingPoints: {
        type: [StoppingPointSchema], 
        required: true, 
        unique: true
    },
    passengers: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: false
    }
});

const modelName: string = 'Route';

export const Route = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<RouteType>(modelName, schema);