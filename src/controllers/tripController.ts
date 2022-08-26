import e, { Request, Response } from 'express';
import { Route } from '../models/Route';
import { Trip } from '../models/Trip';
import { Vehicle } from '../models/Vehicle';

export const index = async (req: Request, res: Response) => {
    try {
        const trips = await Trip.find();

        res.status(200).json(trips);
    } catch (error){
        res.status(400).json({error});
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;

        const trip = await Trip.findById(_id);

        if (trip){
            res.status(200).json(trip);
        } else {
            res.status(400).json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const {route_id, vehicle_id, startTime, endTime, isWayBack, tracking} = req.body;

        const route = await Route.findById(route_id);
        const vehicle = await Vehicle.findById(vehicle_id);

        if (!route) {
            return res.status(400).json({error: {message: 'Rota não encontrada.'}});
        }

        if (!vehicle) {
            return res.status(400).json({error: {message: 'Veículo não encontrado.'}});
        }
        
        //Verifica se existe uma viagem existente para o veículo
        const trip = await Trip.findOne({vehicle_id, endTime: null});

        if (trip){
            res.status(403).json({error: {message: 'Já existe uma viagem em andamento com esse veículo.'}})
            return;
        } else {
            const newTrip = await Trip.create({
                route_id, vehicle_id, startTime, endTime, isWayBack, tracking
            });
            
            res.status(201).json(newTrip);
        }

    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;
        const {route_id, vehicle_id, startTime, endTime, isWayBack, tracking} = req.body;

        const route = await Route.findById(route_id);
        const vehicle = await Vehicle.findById(vehicle_id);

        if (!route) {
            return res.status(400).json({error: {message: 'Rota não encontrada.'}});
        }

        if (!vehicle) {
            return res.status(400).json({error: {message: 'Veículo não encontrado.'}});
        }

        const trip = await Trip.findById(_id);
        
        if (trip){
            trip.route_id = route_id;
            trip.vehicle_id = vehicle_id;
            trip.startTime = startTime;
            trip.endTime = endTime;
            trip.isWayBack = isWayBack;
            trip.tracking = tracking;
            await trip.save();
            
            res.status(200).json(trip);
        } else {
            res.status(400).json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;

        const trip = await Trip.findOneAndDelete({_id});
        
        if (trip){
            res.status(204).json({});
        } else {
            res.status(400).json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const getTripInProgressByVehicleID = async (req: Request, res: Response) => {
    try {
        const {vehicle_id} = req.params;

        const trip = await Trip.findOne({vehicle_id, endTime: null});

        if (trip){
            res.status(200).json(trip);
        } else {
            res.status(400).json({error: {message: 'Nenhuma viagem em andamento com esse veículo foi encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const getCurrentVehicleLocationByTripID = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;

        const trip = await Trip.findOne({_id}, 'tracking');

        if (trip){
            const length = trip.tracking?.length;

            if (length > 0){
                const currentLocation = trip.tracking[length - 1];
                res.status(200).json(currentLocation);
            } else {
                res.status(200).json({});
            }
        } else {
            res.status(400).json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const storeCurrentVehicleLocationByTripID = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;
        const {lat, lng, speed} = req.body;

        const trip = await Trip.findById(_id);

        if (trip?.endTime){
            res.status(403).json({error: {message: 'Viagem encerrada.'}});
        }

        if (trip){
            trip.tracking.push({lat, lng, speed});
            await trip.save();
            
            res.status(200).json(trip);
        } else {
            res.status(400).json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}