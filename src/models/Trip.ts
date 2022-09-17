import { connection, Date, model, Schema } from "mongoose"

type TrackingType = {
    lat: number,
    lng: number,
    speed: number
}

export type TripType = {
    route_id: Schema.Types.ObjectId,
    vehicle_id: Schema.Types.ObjectId,
    startTime: Date,
    endTime?: Date,
    isWayBack: boolean,
    stoppingPointsPerformed_id: Schema.Types.ObjectId[],
    tracking: [TrackingType]
}

const TrackingSchema = new Schema<TrackingType>({
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
    },
    speed: {
        type: Number,
        required: true,
        min: 0
    }
}/* , {_id: false} */);

const schema = new Schema<TripType>({
    route_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Route', 
        required: true
    },
    vehicle_id: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    isWayBack: {
        type: Boolean,
        required: true,
        default: false
    },
    stoppingPointsPerformed_id: [{
        type: Schema.Types.ObjectId,
        ref: 'StoppingPoint',
        required: false
    }],
    tracking: [TrackingSchema],
})

const modelName: string = 'Trip';

export const Trip = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<TripType>(modelName, schema);