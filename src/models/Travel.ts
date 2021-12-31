import { connection, Date, model, Schema } from "mongoose"

type TrackingType = {
    lat: number,
    lng: number,
    speed: number,
    course: number
}

type TravelType = {
    route_id: Schema.Types.ObjectId,
    licensePlate_id: Schema.Types.ObjectId,
    startTime: Date,
    endTime?: Date,
    isWayBack: boolean,
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
    },
    course: {
        type: Number,
        required: true
    }
});

const schema = new Schema<TravelType>({
    route_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Route', 
        required: true
    },
    licensePlate_id: {
        type: Schema.Types.ObjectId,
        ref: 'Bus',
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
    tracking: [TrackingSchema]
})

const modelName: string = 'Travel';

export const Travel = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<TravelType>(modelName, schema);