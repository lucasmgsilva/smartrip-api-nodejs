import { Request, Response } from 'express';
import { Travel } from '../models/Travel';

export const getAll = async (req: Request, res: Response) => {
    try {
        let viagens = await Travel.find();

        res.status(200).json(viagens);
    } catch (error){
        res.status(400).json({error});
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
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
    }
}

export const start = async (req: Request, res: Response) => {
    try {
        const {trajeto_id} = req.body;
        const tempoInicio = new Date();

        const newTravel = await Travel.create({
            trajeto_id, tempoInicio, tempoTermino: null
        });
        
        res.status(201).json(newTravel);
    } catch (error){
        res.status(400).json({error})
    }
}

export const updateCurrentLocation = async (req: Request, res: Response) => {
    try {
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
    }
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