import { Router } from 'express';
import * as TravelController from '../controllers/travelController';
import * as PhraseController from '../controllers/phraseController';

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200).json({
        pong: true
    })
});

router.get('/viagens', TravelController.index);

/*router.get('/frases', PhraseController.index); //Lista todas as frases
router.post('/frases', PhraseController.store); //Armazena uma frase
router.get('/frases/:_id', PhraseController.show); //Mostra uma frase
router.put('/frases/:_id', PhraseController.update); //Atualiza uma frase
router.delete('/frases/:_id', PhraseController.destroy); //Destrói uma frase*/

export default router;