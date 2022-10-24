import { connection, model, Schema } from "mongoose"

export type UserType = {
    name: string,
    email: string,
    password: string,
    cellPhone: string,
    educationalInstitution: string,
    type: string
}

const schema = new Schema<UserType>({
    name: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 3, 
        maxlength: 50
    },
    email: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 3, 
        maxlength: 64, 
        unique: true, 
        validate: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 6, 
        maxlength: 24
    },
    cellPhone: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 15, 
        maxlength: 15, 
        validate: /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/
    },
    educationalInstitution: {
        type: String, 
        trim: true, 
        required: false, 
        minlength: 3, 
        maxlength: 50
    },
    type: {
        type: String, 
        trim: true, 
        required: false, 
        enum: [
            'driver', 
            'student', 
            'administrator'
        ]
    }
});

const modelName: string = 'User';

export const User = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<UserType>(modelName, schema);