const Router = require('express').Router();

const { deleteCities, getCities } = require('../controllers/citiesControllers');
const { loadCities, modifiCities } = require('../controllers/citiesControllers');
const citiesControllers = require('../controllers/citiesControllers');


Router.route('/cities')
.get(getCities)
.post(loadCities)

Router.route('/cities/:id')
.delete(deleteCities)
.put(modifiCities)
module.exports = Router