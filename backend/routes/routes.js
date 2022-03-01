const Router = require('express').Router();

const citiesControllers = require('../controllers/citiesControllers');

const {getCities}=citiesControllers

Router.route('/cities')
.get(getCities)


module.exports = Router