import { Request, Response } from 'express';
import { Vehicle } from '../models/Vehicle';

export const index = async (req: Request, res: Response) => {
    try {
        const vehicles = await Vehicle.find();

        res.status(200).json(vehicles);
    } catch (error){
        res.status(400).json({error});
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        const {licensePlate} = req.params;

        const vehicle = await Vehicle.findOne({licensePlate});

        if (vehicle){
            res.status(200).json(vehicle);
        } else {
            res.status(400).json({error: {message: 'Veículo não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const {description, licensePlate, type} = req.body;

        const newVehicle = await Vehicle.create({
            description, licensePlate, type
        });
        
        res.status(201).json(newVehicle);
    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const {licensePlate} = req.params;
        const newLicensePlate = req.body.licensePlate;
        const {description, type} = req.body;

        const vehicle = await Vehicle.findOne({licensePlate});
        
        if (vehicle){
            vehicle.description = description;
            vehicle.licensePlate = newLicensePlate;
            vehicle.type = type;
            await vehicle.save();
            
            res.status(200).json(vehicle);
        } else {
            res.status(400).json({error: {message: 'Veículo não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const {licensePlate} = req.params;

        const vehicle = await Vehicle.findOneAndDelete({licensePlate});
        
        if (vehicle){
            res.status(204).json({});
        } else {
            res.status(400).json({error: {message: 'Veículo não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}