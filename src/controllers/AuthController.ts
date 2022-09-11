import { Request, Response } from 'express';
import { User } from '../models/User';

export const index = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (user) {
            if (user.password === password) {
                return res.status(200).json(user);
            } else {
                return res.status(400).json({error: {message: 'E-mail ou senha inválidos.'}});
            }
        }

        res.status(400).json({error: {message: 'Usuário não encontrado.'}});
    } catch (error){
        res.status(400).json({error});
    }
}