const mongoose = require('mongoose')

const tinerariesSchema = new mongoose.Schema({
    city:{type:String, required:true},
    city_id:{type:String, required:true},
    country:{type:String, required:true},
    imgUser:{type:String, required:true},
    userName:{type:String, required:true},
    itineraryName:{type:String, required:true},
    price:{type:String, required:true},
    duration:{type:String, required:true},
    likes:{type:Number, required:true},
    hashtags:{type:Array, required:true},
    coments:{type:String, required:true},

})
const Itineraries = mongoose.model('itineraries', tinerariesSchema)
module.exports = Itineraries