import { connection, model, Schema } from "mongoose"

type Coordinate = {
    lat: number,
    lng: number
}

type StoppingPoint = {
    description: string,
    coordinates: Coordinate
}

type City = {
    name: string,
    federalUnit: string,
    stoppingPoints: [StoppingPoint]
}

type RouteType = {
    description: string,
    cities: [City]
}

const CoordinateSchema = new Schema<Coordinate>({
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
})

const StoppingPointSchema = new Schema<StoppingPoint>({
    description: {type: String, required: true, minlength: 3, maxlength: 25},
    coordinates: CoordinateSchema
})

const CitySchema = new Schema<City>({
    name: {type: String, required: true, minlength: 3, maxlength: 35},
    federalUnit: {type: String, required: true, minlength: 2, maxlength: 2},
    stoppingPoints: [StoppingPointSchema]
});

const schema = new Schema<RouteType>({
    description: {type: String, required: true, minlength: 3, maxlength: 25},
    cities: [CitySchema]
});

const modelName: string = 'Route';

export const Route = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<RouteType>(modelName, schema);