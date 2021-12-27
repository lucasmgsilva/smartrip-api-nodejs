import { Request, Response } from 'express';
import { Phrase } from '../models/Phrase';

export const ping = (req: Request, res: Response) => {
    res.status(200).json({
        pong: true
    })
}

export const index = async (req: Request, res: Response) => {
    try {
        let phrases = await Phrase.find();

        res.status(200).json(phrases);
    } catch (error){
        res.status(400).json({error});
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        let {author, txt} = req.body;

        let newPhrase = await Phrase.create({author, txt});
        
        res.status(201).json(newPhrase);
    } catch (error){
        res.status(400).json({error})
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        let phrase = await Phrase.findById(_id);

        res.status(200);

        if (phrase){
            res.json(phrase);
        } else {
            res.json({error: {message: 'Frase não encontrada'}});
        }

    } catch (error){
        res.status(400).json({error});
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;
        let {author, txt} = req.body;

        let phrase = await Phrase.findById(_id);
        
        res.status(200);
        if (phrase){
            phrase.author = author;
            phrase.txt = txt;
            await phrase.save();
            
            res.json(phrase);
        } else {
            res.json({error: {message: 'Frase não encontrada.'}})
        }

    } catch (error){
        res.status(400).json({error});
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        let {_id} = req.params;

        await Phrase.remove({_id});
        
        res.status(200).json({}) 
    } catch (error){
        res.status(400).json({error});
    }
}