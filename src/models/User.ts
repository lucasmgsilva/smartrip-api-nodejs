import { connection, model, Schema } from "mongoose"

type UserType = {
    name: string,
    email: string,
    password: string,
    cellPhone: string,
    course: string,
    educationalInstitution: string,
    type: string;
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
        validate: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
    },
    password: {
        type: String, 
        trim: true, 
        required: true, 
        minlength: 6, 
        maxlength: 25
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
        required: true, 
        minlength: 3, 
        maxlength: 50
    },
    type: {
        type: String, 
        trim: true, 
        required: true, 
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