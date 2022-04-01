const Router = require('express').Router();
const usersControllers = require('../controllers/usersControllers');
const citiesControllers = require('../controllers/citiesControllers'); 
const itinerariesControllers = require('../controllers/itinerariesControllers')
const activitiesControllers = require('../controllers/activitiesControllers')
const commentsControllers = require('../controllers/commentsControllers')
const {deleteCities, getCities,loadCities, modifiCities, getOneCity } = citiesControllers
const {signUpUsers, signInUser, signOutUser, verifyEmail, VerifyToken}= usersControllers
const {getOneItinerary, likeDislike} = itinerariesControllers
const {getActivities, loadActivities, deleteActivities, modifiActivities, getActivitiesByItineraryId} = activitiesControllers
const {addComment, modifiComment, deleteComment} = commentsControllers
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

Router.route('/likeDislike/:id')
.put(passport.authenticate('jwt',{ session:false }), likeDislike)

Router.route('/activities')
.get(getActivities)
.post(loadActivities)

Router.route('/activities/:id')
.get(getActivitiesByItineraryId)
.delete(deleteActivities)
.put(modifiActivities)

Router.route('/itineraries/comment')
.post(passport.authenticate('jwt',{ session:false }),addComment)
.put(passport.authenticate('jwt',{ session:false }),modifiComment)

Router.route('/itineraries/comment/:id')
.post(passport.authenticate('jwt',{ session:false }),deleteComment)






module.exports = Router