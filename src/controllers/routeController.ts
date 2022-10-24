import { Request, Response } from 'express';
import { Route } from '../models/Route';
import { User } from '../models/User';

export const index = async (req: Request, res: Response) => {
    try {
        const routes = await Route.find();

        res.status(200).json(routes);
    } catch (error){
        res.status(400).json({error});
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;

        const route = await Route.findById(_id);

        if (route){
            res.status(200).json(route);
        } else {
            res.status(400).json({error: {message: 'Rota não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const {description, stoppingPoints, passengers_id} = req.body;

        if (passengers_id.length > 0){
            const count = await User.find({
                _id: {$in: passengers_id},
            }).countDocuments();
            
            if (count === passengers_id.length){
                const newRoute = await Route.create({
                    description, stoppingPoints, passengers_id
                });
                res.status(201).json(newRoute);
            } else {
                res.status(400).json({error: {message: 'Passageiro(s) não encontrado(s).'}});
            }
        } else {
            const newRoute = await Route.create({
                description, stoppingPoints
            });
            res.status(201).json(newRoute);
        }
    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;
        const {description, stoppingPoints, passengers_id} = req.body;

        const route = await Route.findById(_id);
        
        if (route){
            route.description = description;
            route.stoppingPoints = stoppingPoints;

            if (passengers_id.length > 0){
                const count = await User.find({
                    _id: {$in: passengers_id},
                }).countDocuments();
                
                if (count === passengers_id.length){
                    route.passengers_id = passengers_id;
                    await route.save();
                    res.status(200).json(route);
                } else {
                    res.status(400).json({error: {message: 'Usuário(s) não encontrado(s).'}});
                    return;
                }
            } else {
                route.passengers_id = [];
                await route.save();
                res.status(200).json(route);
            }
        } else {
            res.status(400).json({error: {message: 'Rota não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;

        const route = await Route.findOneAndDelete({_id});
        
        if (route){
            res.status(204).json({});
        } else {
            res.status(400).json({error: {message: 'Rota não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}