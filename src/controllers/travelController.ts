import e, { Request, Response } from 'express';
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

export const getTravelInProgressByBusID = async (req: Request, res: Response) => {
    try {
        let {bus_id} = req.params;

        let travel = await Travel.findOne({"bus_id": bus_id, "endTime": null});

        res.status(200);

        if (travel){
            res.json(travel);
        } else {
            res.json({error: {message: 'Nenhuma viagem em andamento com esse ônibus foi encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const getCurrentLocationByTravelID = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        let travel = await Travel.findOne({_id}, 'tracking');
        
        res.status(200);

        if (travel){
            let length = travel.tracking?.length;

            if (length > 0){
                let currentLocation = travel.tracking[length - 1];
                res.json(currentLocation);
            } else {
                res.json({});
            }
        } else {
            res.json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        let {route_id, bus_id, startTime, endTime, isWayBack, tracking} = req.body;
        
        let travel = await Travel.findOne({bus_id, endTime: null});

        if (travel){
            res.status(403).json({error: {message: 'Já existe uma viagem em andamento com esse ônibus.'}})
            return;
        }

        let newTravel = await Travel.create({
            route_id, bus_id, startTime, endTime, isWayBack, tracking
        });
        
        res.status(201).json(newTravel);
    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;
        let {route_id, bus_id, startTime, endTime, isWayBack, tracking} = req.body;

        let travel = await Travel.findById(_id);
        
        res.status(200);
        if (travel){
            travel.route_id = route_id;
            travel.bus_id = bus_id;
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
        let {lat, lng, speed} = req.body;

        let travel = await Travel.findById(_id);

        if (travel?.endTime){
            res.status(403).json({error: {message: 'Viagem encerrada.'}});
            return;
        }

        res.status(200);
        if (travel){
            travel.tracking.push({lat, lng, speed});
            await travel.save();
            
            res.json(travel);
        } else {
            res.json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        let travel = await Travel.findOneAndDelete({_id});
        
        ;
        if (travel){
            res.status(204).json({});
        } else {
            res.status(200).json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}