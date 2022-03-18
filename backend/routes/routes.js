const Router = require('express').Router();
const usersControllers = require('../controllers/usersControllers');
const citiesControllers = require('../controllers/citiesControllers'); 
const itinerariesControllers = require('../controllers/itinerariesControllers')
const {deleteCities, getCities,loadCities, modifiCities, getOneCity } = citiesControllers
const {signUpUsers, signInUser, signOutUser, verifyEmail, VerifyToken}= usersControllers
const {getOneItinerary} = itinerariesControllers
const validator = require('../config/validator')
const passport = require('../config/passport')




Router.route('/cities')
.get(getCities)
.post(loadCities)

Router.route('/cities/:id')
.get(getOneCity)
.delete(deleteCities)
.put(modifiCities)

Router.route('/itineraries/:id')
.get(getOneItinerary)


Router.route('/auth/signUp')
.post(validator,signUpUsers)

Router.route('/auth/signIn')
.post(signInUser)

Router.route('/auth/signOut')
.post(signOutUser)

Router.route('/verify/:uniqueString') //RECIBE EL LINK DE USUARIO
.get(verifyEmail) //LLAMA A FUNCION DE VERIFICACIION


Router.route('/auth/signInToken')
.get(passport.authenticate('jwt',{ session:false }), VerifyToken)

module.exports = Router