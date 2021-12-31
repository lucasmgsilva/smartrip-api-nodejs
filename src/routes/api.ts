import { Router } from 'express';
import * as BusController from '../controllers/busController';
import * as RouteController from '../controllers/routeController';
import * as UserController from '../controllers/userController';
import * as TravelController from '../controllers/travelController';

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200).json({
        pong: true
    })
});

// Buses
router.get('/buses', BusController.index);
router.post('/buses', BusController.store);
router.get('/buses/:licensePlate', BusController.show);
router.put('/buses/:licensePlate', BusController.update);
router.delete('/buses/:licensePlate', BusController.destroy);

// Routes
router.get('/routes', RouteController.index);
router.post('/routes', RouteController.store);
router.get('/routes/:_id', RouteController.show);
router.put('/routes/:_id', RouteController.update);
router.delete('/routes/:_id', RouteController.destroy);

// Users
router.get('/users', UserController.index);
router.post('/users', UserController.store);
router.get('/users/:_id', UserController.show);
router.put('/users/:_id', UserController.update);
router.delete('/users/:_id', UserController.destroy);

// Travels
router.get('/travels', TravelController.index);
router.get('/travels/:_id', TravelController.show);
router.post('/travels', TravelController.store);
router.put('/travels/:_id', TravelController.update);
router.put('/travels/:_id/tracking', TravelController.updateCurrentLocation);

export default router;