import { combineReducers } from "redux";
import citiesReducer from './citiesReducer'

const mainReducer = combineReducers({

    City: citiesReducer


})

export default mainReducer