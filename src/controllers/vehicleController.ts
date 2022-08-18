import { Request, Response } from 'express';
import { Vehicle } from '../models/Vehicle';

export const index = async (req: Request, res: Response) => {
    try {
        let vehicles = await Vehicle.find();

        res.status(200).json(vehicles);
    } catch (error){
        res.status(400).json({error});
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        let {licensePlate} = req.params;

        let vehicle = await Vehicle.findOne({licensePlate});

        res.status(200);

        if (vehicle){
            res.json(vehicle);
        } else {
            res.json({error: {message: 'Veículo não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const {description, licensePlate, brand, model} = req.body;

        const newVehicle = await Vehicle.create({
            description, licensePlate, brand, model
        });
        
        res.status(201).json(newVehicle);
    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        let {licensePlate} = req.params;
        let newLicensePlate = req.body.licensePlate;
        let {description, brand, model} = req.body;

        let vehicle = await Vehicle.findOne({licensePlate});
        
        res.status(200);
        if (vehicle){
            vehicle.description = description;
            vehicle.licensePlate = newLicensePlate;
            vehicle.brand = brand;
            vehicle.model = model;
            await vehicle.save();
            
            res.json(vehicle);
        } else {
            res.json({error: {message: 'Veículo não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        let {licensePlate} = req.params;

        let vehicle = await Vehicle.findOneAndDelete({licensePlate});
        
        if (vehicle){
            res.status(204).json({});
        } else {
            res.status(200).json({error: {message: 'Veículo não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}