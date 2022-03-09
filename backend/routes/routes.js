const Router = require('express').Router();
const citiesControllers = require('../controllers/citiesControllers');
/* const { deleteCities, getCities } = require('../controllers/citiesControllers');
const { loadCities, modifiCities, getOneCity } = require('../controllers/citiesControllers'); */
const {deleteCities, getCities,loadCities, modifiCities, getOneCity } = citiesControllers


Router.route('/cities')
.get(getCities)
.post(loadCities)

Router.route('/cities/:id')
.get(getOneCity)
.delete(deleteCities)
.put(modifiCities)
module.exports = Router