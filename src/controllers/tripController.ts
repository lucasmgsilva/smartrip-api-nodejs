import e, { Request, Response } from 'express';
import { Trip } from '../models/Trip';

export const index = async (req: Request, res: Response) => {
    try {
        let trips = await Trip.find();

        res.status(200).json(trips);
    } catch (error){
        res.status(400).json({error});
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        let trip = await Trip.findById(_id);

        res.status(200);

        if (trip){
            res.json(trip);
        } else {
            res.json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const getTripInProgressByVehicleID = async (req: Request, res: Response) => {
    try {
        let {vehicle_id} = req.params;

        let trip = await Trip.findOne({"vehicle_id": vehicle_id, "endTime": null});

        res.status(200);

        if (trip){
            res.json(trip);
        } else {
            res.json({error: {message: 'Nenhuma viagem em andamento com esse veículo foi encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const getCurrentLocationByTripID = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        let trip = await Trip.findOne({_id}, 'tracking');
        
        res.status(200);

        if (trip){
            let length = trip.tracking?.length;

            if (length > 0){
                let currentLocation = trip.tracking[length - 1];
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
        let {route_id, vehicle_id, startTime, endTime, isWayBack, tracking} = req.body;
        
        let trip = await Trip.findOne({vehicle_id, endTime: null});

        if (trip){
            res.status(403).json({error: {message: 'Já existe uma viagem em andamento com esse veículo.'}})
            return;
        }

        let newTrip = await Trip.create({
            route_id, vehicle_id, startTime, endTime, isWayBack, tracking
        });
        
        res.status(201).json(newTrip);
    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;
        let {route_id, vehicle_id, startTime, endTime, isWayBack, tracking} = req.body;

        let trip = await Trip.findById(_id);
        
        res.status(200);
        if (trip){
            trip.route_id = route_id;
            trip.vehicle_id = vehicle_id;
            trip.startTime = startTime;
            trip.endTime = endTime;
            trip.isWayBack = isWayBack;
            trip.tracking = tracking;
            await trip.save();
            
            res.json(trip);
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

        let trip = await Trip.findById(_id);

        if (trip?.endTime){
            res.status(403).json({error: {message: 'Viagem encerrada.'}});
            return;
        }

        res.status(200);
        if (trip){
            trip.tracking.push({lat, lng, speed});
            await trip.save();
            
            res.json(trip);
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

        let trip = await Trip.findOneAndDelete({_id});
        
        ;
        if (trip){
            res.status(204).json({});
        } else {
            res.status(200).json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}