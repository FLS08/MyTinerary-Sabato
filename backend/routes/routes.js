const Router = require('express').Router();
const citiesControllers = require('../controllers/citiesControllers'); 
const itinerariesControllers = require('../controllers/itinerariesControllers')
 /*const { loadCities, modifiCities, getOneCity } = require('../controllers/citiesControllers'); */
const {deleteCities, getCities,loadCities, modifiCities, getOneCity } = citiesControllers
const {getOneItinerary} = itinerariesControllers


Router.route('/cities')
.get(getCities)
.post(loadCities)

Router.route('/cities/:id')
.get(getOneCity)
.delete(deleteCities)
.put(modifiCities)

Router.route('/itineraries/:id')
.get(getOneItinerary)

module.exports = Router