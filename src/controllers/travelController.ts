import { Request, Response } from 'express';
import { Travel } from '../models/Travel';

export const index = async (req: Request, res: Response) => {
    try {
        let travels = await Travel.find();

        res.status(200).json(travels);
    } catch (error){
        res.status(400).json({error});
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        let travel = await Travel.findById(_id);

        res.status(200);

        if (travel){
            res.json(travel);
        } else {
            res.json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const {route_id, licensePlate_id, startTime, endTime, isWayBack, tracking} = req.body;

        const newTravel = await Travel.create({
            route_id, licensePlate_id, startTime, endTime, isWayBack, tracking
        });
        
        res.status(201).json(newTravel);
    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;
        let {route_id, licensePlate_id, startTime, endTime, isWayBack, tracking} = req.body;

        let travel = await Travel.findById(_id);
        
        res.status(200);
        if (travel){
            travel.route_id = route_id;
            travel.licensePlate_id = licensePlate_id;
            travel.startTime = startTime;
            travel.endTime = endTime;
            travel.isWayBack = isWayBack;
            travel.tracking = tracking;
            await travel.save();
            
            res.json(travel);
        } else {
            res.json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const updateCurrentLocation = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;
        let {lat, lng, speed, course} = req.body;

        let travel = await Travel.findById(_id);

        res.status(200);
        if (travel){
            travel.tracking.push({lat, lng, speed, course});
            await travel.save();
            
            res.json(travel);
        } else {
            res.json({error: {message: 'Viagem não encontrada.'}})
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        let travel = await Travel.findOneAndDelete({_id});
        
        res.status(200);
        if (travel){
            res.json(travel);
        } else {
            res.json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}