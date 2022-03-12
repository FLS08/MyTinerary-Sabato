const Router = require('express').Router();
const usersControllers = require('../controllers/usersControllers');
const citiesControllers = require('../controllers/citiesControllers'); 
const itinerariesControllers = require('../controllers/itinerariesControllers')
const {deleteCities, getCities,loadCities, modifiCities, getOneCity } = citiesControllers
const {signUpUsers, signInUser, signOutUser}= usersControllers
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

console.log("Fixed")

Router.route('/auth/signUp')
.post(signUpUsers)

Router.route('/auth/signIn')
.post(signInUser)

Router.route('/auth/signOut')
.post(signOutUser)

module.exports = Router