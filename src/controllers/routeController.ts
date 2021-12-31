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
        const {description, cities} = req.body;

        const newRoute = await Route.create({
            description, cities
        });
        
        res.status(201).json(newRoute);
    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;
        let {description, cities} = req.body;

        let route = await Route.findById(_id);
        
        res.status(200);
        if (route){
            route.description = description;
            route.cities = cities;
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