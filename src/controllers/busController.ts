import { Request, Response } from 'express';
import { Bus } from '../models/Bus';

export const index = async (req: Request, res: Response) => {
    try {
        let buses = await Bus.find();

        res.status(200).json(buses);
    } catch (error){
        res.status(400).json({error});
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        let {licensePlate} = req.params;

        let bus = await Bus.findOne({licensePlate});

        res.status(200);

        if (bus){
            res.json(bus);
        } else {
            res.json({error: {message: 'Ônibus não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const {description, licensePlate, brand, model} = req.body;

        const newBus = await Bus.create({
            description, licensePlate, brand, model
        });
        
        res.status(201).json(newBus);
    } catch (error){
        res.status(400).json({error})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        let {licensePlate} = req.params;
        let newLicensePlate = req.body.licensePlate;
        let {description, brand, model} = req.body;

        let bus = await Bus.findOne({licensePlate});
        
        res.status(200);
        if (bus){
            bus.description = description;
            bus.licensePlate = newLicensePlate;
            bus.brand = brand;
            bus.model = model;
            await bus.save();
            
            res.json(bus);
        } else {
            res.json({error: {message: 'Ônibus não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        let {licensePlate} = req.params;

        let bus = await Bus.findOneAndDelete({licensePlate});
        
        res.status(200);
        if (bus){
            res.json(bus);
        } else {
            res.json({error: {message: 'Ônibus não encontrado.'}});
        }
    } catch (error){
        res.status(400).json({error});
    }
}