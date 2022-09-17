import e, { Request, Response } from 'express';
import { Route, RouteType } from '../models/Route';
import { Trip, TripType } from '../models/Trip';
import { Vehicle } from '../models/Vehicle';
import { getDistanceBetweenCoordinatesInKm } from '../utils/functions';

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

        const trip = await Trip.findOne({_id}, 'tracking stoppingPointsPerformed_id');

        if (trip){
            const length = trip.tracking?.length;

            if (length > 0){
                const currentLocation = trip.tracking[length - 1];

                res.status(200).json({lat: currentLocation.lat, lng: currentLocation.lng, speed: currentLocation.speed, stoppingPointsPerformed_id: trip.stoppingPointsPerformed_id});
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
        } else if (trip){
            trip.tracking.push({lat, lng, speed});

            const route: RouteType = await Route.findById(trip.route_id);

            //Verifica se existe um ponto de parada na localização em que o ônibus está
            const stoppingPointMatching = route.stoppingPoints.find(stoppingPoint => getDistanceBetweenCoordinatesInKm(stoppingPoint.coordinates.lat, stoppingPoint.coordinates.lng, lat, lng) <= 0.025); //25 metros

            if (stoppingPointMatching){
                //Se existir um ponto de parada na localização em que o ônibus está, verifica se o ônibus já passou por ele para não registrar a passagem duas vezes
                const shouldBeInsertStoppingPoint = !(trip as TripType).stoppingPointsPerformed_id.includes(stoppingPointMatching._id)

                if (shouldBeInsertStoppingPoint){
                    trip.stoppingPointsPerformed_id.push(stoppingPointMatching._id);

                    if (route.stoppingPoints.every(stoppingPoint => (trip as TripType).stoppingPointsPerformed_id.includes(stoppingPoint._id))){
                        trip.endTime = new Date();
                    }
                }
            }

            await trip.save();
            
            res.status(200).json(trip);
        } else {
            res.status(400).json({error: {message: 'Viagem não encontrada.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}