import { Request, Response } from 'express';
import { User } from '../models/User';

export const index = async (req: Request, res: Response) => {
    try {
        let users = await User.find({}).select('-password');

        res.status(200).json(users);
    } catch (error){
        res.status(400).json({error});
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        let user = await User.findById(_id).select('-password');

        res.status(200);

        if (user){
            res.json(user);
        } else {
            res.json({error: {message: 'Usuário não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const {name, email, password, cellPhone, course, educationalInstitution, type} = req.body;

        const newUser = await User.create({
            name, email, password, cellPhone, course, educationalInstitution, type
        });
        
        res.status(201).json(newUser);
    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;
        let {name, email, password, cellPhone, course, educationalInstitution, type} = req.body;

        let user = await User.findById(_id);
        
        res.status(200);
        if (user){
            user.name = name;
            user.email = email;
            user.password = password;
            user.cellPhone = cellPhone;
            user.course = course;
            user.educationalInstitution = educationalInstitution;
            user.type = type;
            await user.save();
            
            res.json(user);
        } else {
            res.json({error: {message: 'Usuário não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        let user = await User.findOneAndDelete({_id});
        
        if (user){
            res.status(204).json({});
        } else {
            res.status(200).json({error: {message: 'Usuário não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}