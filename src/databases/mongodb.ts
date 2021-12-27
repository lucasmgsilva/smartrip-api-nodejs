import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const mongoConnect = async () => {
    try {
        console.log('Conectando-se ao MongoDB...');
        await connect(process.env.MONGO_URL as string);
        console.log('Conexão realizada com sucesso!');
    } catch (error){
        console.log('Falha ao conectar-se ao MongoDB: ', error);
    }
}