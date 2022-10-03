import { Request, Response } from 'express';
import { User } from '../models/User';

export const index = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email, password});

        if (user){
            if (user.type){
                res.status(200).json(user);
            } else {
                return res.status(400).json({error: {message: 'Usuário aguardando aprovação.'}});
            }
        } else {
            return res.status(400).json({error: {message: 'E-mail ou senha inválidos.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}