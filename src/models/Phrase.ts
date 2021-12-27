import { connection, model, Schema } from "mongoose"

type PhraseType = {
    author: string,
    txt: string
}

const schema = new Schema<PhraseType>({
    author: {type: String, required: true},
    txt: {type: String, required: true}
})

const modelName: string = 'Phrase';

export const Phrase = (connection && connection.models[modelName]) ? 
    connection.models[modelName] : model<PhraseType>(modelName, schema);