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
    federativeUnit: string,
    stoppingPoints: [StoppingPoint]
}

type RouteType = {
    description: string,
    cities: [City]
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
    coordinates: {
        type: CoordinateSchema, 
        required: true
    }
}, {_id: false})

const CitySchema = new Schema<City>({
    name: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 3, 
        maxlength: 35
    },
    federativeUnit: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 2, 
        maxlength: 2
    },
    stoppingPoints: {
        type: [StoppingPointSchema], 
        required: true
    }
}, {_id: false});

const schema = new Schema<RouteType>({
    description: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 3, 
        maxlength: 45
    },
    cities: {
        type: [CitySchema], 
        required: true, 
        unique: true
    }
});

const modelName: string = 'Route';

export const Route = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<RouteType>(modelName, schema);