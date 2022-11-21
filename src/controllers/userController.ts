import { Request, Response } from 'express';
import { User } from '../models/User';

export const index = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).select('-password');

        res.status(200).json(users);
    } catch (error){
        res.status(400).json({error});
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;

        const user = await User.findById(_id).select('-password');

        if (user){
            res.status(200).json(user);
        } else {
            res.status(400).json({error: {message: 'Usuário não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const {name, email, password, cellPhone, educationalInstitution, type} = req.body;

        const newUser = await User.create({
            name, email, password, cellPhone, educationalInstitution: (educationalInstitution.length > 0 ? educationalInstitution : null), type
        });
        
        res.status(201).json(newUser);
    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;
        const {name, email, password, cellPhone, educationalInstitution, type} = req.body;

        const user = await User.findById(_id);
        
        if (user) {
            user.name = name;
            user.email = email;
            user.cellPhone = cellPhone;
            user.educationalInstitution = educationalInstitution.length > 0 ? educationalInstitution : null;
            user.type = type;

            if (password) user.password = password;

            await user.save();
            
            res.status(200).json(user);
        } else {
            res.status(400).json({error: {message: 'Usuário não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;

        const user = await User.findOneAndDelete({_id});
        
        if (user){
            res.status(204).json({});
        } else {
            res.status(400).json({error: {message: 'Usuário não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}