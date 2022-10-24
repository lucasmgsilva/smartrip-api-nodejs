import { Router } from 'express';
import * as VehicleController from '../controllers/vehicleController';
import * as RouteController from '../controllers/routeController';
import * as UserController from '../controllers/userController';
import * as AuthController from '../controllers/authController';
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
router.get('/vehicles/:_id', VehicleController.show);
router.put('/vehicles/:_id', VehicleController.update);
router.delete('/vehicles/:_id', VehicleController.destroy);

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

// Auth
router.post('/auth', AuthController.index);

// Trips
router.get('/trips', TripController.index);
router.post('/trips', TripController.store);
router.get('/trips/:_id', TripController.show);
router.put('/trips/:_id', TripController.update);
router.delete('/trips/:_id', TripController.destroy);

router.get('/trips/byUser/:user_id', TripController.getAllTripsByUserID);
router.get('/trips/inProgress/:vehicle_id', TripController.getTripInProgressByVehicleID);
router.get('/trips/:_id/currentVehicleLocation', TripController.getCurrentVehicleLocationByTripID);
router.post('/trips/:_id/currentVehicleLocation/', TripController.storeCurrentVehicleLocationByTripID);

export default router;