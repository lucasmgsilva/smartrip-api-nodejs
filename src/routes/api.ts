import { Router } from 'express';
import * as VehicleController from '../controllers/vehicleController';
import * as RouteController from '../controllers/routeController';
import * as UserController from '../controllers/userController';
import * as TripController from '../controllers/tripController';

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200).json({
        pong: true
    })
});

// Vehicles
router.get('/vehicles', VehicleController.index);
router.post('/vehicles', VehicleController.store);
router.get('/vehicles/:licensePlate', VehicleController.show);
router.put('/vehicles/:licensePlate', VehicleController.update);
router.delete('/vehicles/:licensePlate', VehicleController.destroy);

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

// Trips
router.get('/trips', TripController.index);
router.post('/trips', TripController.store);
router.get('/trips/:_id', TripController.show);
router.put('/trips/:_id', TripController.update);
router.delete('/trips/:_id', TripController.destroy);

router.get('/trips/inProgress/:vehicle_id', TripController.getTripInProgressByVehicleID);
router.get('/trips/currentLocation/:_id', TripController.getCurrentLocationByTripID);
router.put('/trips/tracking/:_id', TripController.updateCurrentLocation);

export default router;