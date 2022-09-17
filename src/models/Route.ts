import { connection, model, ObjectId, Schema } from "mongoose"

type Coordinate = {
    lat: number,
    lng: number
}

type StoppingPoint = {
    _id: ObjectId,
    description: string,
    executionOrder: number,
    coordinates: Coordinate
}

export type RouteType = {
    description: string,
    stoppingPoints: [StoppingPoint]
    passengers_id: [Schema.Types.ObjectId]
}

const CoordinateSchema = new Schema<Coordinate>({
    lat: {
        type: Number, 
        required: true,
        min: -90,
        max: 90
    },
    lng: {
        type: Number, 
        required: true,
        min: -180,
        max: 180
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
        required: true,
        min: 0
    },
    coordinates: {
        type: CoordinateSchema, 
        required: true
    }
}/* , {_id: false} */)

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
    passengers_id: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: false
    }
});

const modelName: string = 'Route';

export const Route = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<RouteType>(modelName, schema);