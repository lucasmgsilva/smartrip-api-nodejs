import { Router } from 'express';
import * as BusController from '../controllers/busController';
import * as TravelController from '../controllers/travelController';

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200).json({
        pong: true
    })
});

router.get('/buses', BusController.index);
router.post('/buses', BusController.store);

router.get('/viagens', TravelController.getAll);
router.get('/viagens/:_id', TravelController.getOne);
router.post('/viagens', TravelController.start);
router.put('/viagens/:_id', TravelController.updateCurrentLocation);

/*router.get('/frases', PhraseController.index); //Lista todas as frases
router.post('/frases', PhraseController.store); //Armazena uma frase
router.get('/frases/:_id', PhraseController.show); //Mostra uma frase
router.put('/frases/:_id', PhraseController.update); //Atualiza uma frase
router.delete('/frases/:_id', PhraseController.destroy); //Destrói uma frase*/

export default router;