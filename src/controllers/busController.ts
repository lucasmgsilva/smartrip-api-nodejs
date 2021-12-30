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
    /*try {
        let {_id} = req.params;

        let travel = await Travel.findById(_id);

        res.status(200);

        if (travel){
            res.json(travel);
        } else {
            res.json({error: {message: 'Viagem não encontrada'}});
        }

    } catch (error){
        res.status(400).json({error});
    }*/
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
    /*try {
        let {_id} = req.params;
        let {lat, long} = req.body;
        console.log(lat, long);

        let travel = await Travel.findById(_id);

        res.status(200);
        if (travel){
            travel.localizacao.push({lat, long});
            await travel.save();
            
            res.json(travel);
        } else {
            res.json({error: {message: 'Viagem não encontrada.'}})
        }
    } catch (error){
        res.status(400).json({error});
    }*/
}

export const destroy = async (req: Request, res: Response) => {
    /*try {
        let {_id} = req.params;

        await Phrase.remove({_id});
        
        res.status(200).json({}) 
    } catch (error){
        res.status(400).json({error});
    }*/
}