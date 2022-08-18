import { Request, Response } from 'express';
import { Route } from '../models/Route';

export const index = async (req: Request, res: Response) => {
    try {
        let routes = await Route.find();

        res.status(200).json(routes);
    } catch (error){
        res.status(400).json({error});
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        let route = await Route.findById(_id);

        res.status(200);

        if (route){
            res.json(route);
        } else {
            res.json({error: {message: 'Rota não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const {description, stoppingPoints, passengers_id} = req.body;

        const newRoute = await Route.create({
            description, stoppingPoints, passengers_id
        });
        
        res.status(201).json(newRoute);
    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;
        let {description, stoppingPoints, passengers_id} = req.body;

        let route = await Route.findById(_id);
        
        res.status(200);
        if (route){
            route.description = description;
            route.stoppingPoints = stoppingPoints;
            route.passengers_id = passengers_id;
            await route.save();
            
            res.json(route);
        } else {
            res.json({error: {message: 'Rota não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        let route = await Route.findOneAndDelete({_id});
        
        if (route){
            res.status(204).json({});
        } else {
            res.status(200).json({error: {message: 'Rota não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}