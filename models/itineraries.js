const mongoose = require('mongoose')

const tinerariesSchema = new mongoose.Schema({
    city:{type:String, required:true},
    city_id:{type:String, required:true},
    country:{type:String, required:true},
    imgUser:{type:String, required:true},
    userName:{type:String, required:true},          //Name of who directs the itinerary 
    itineraryName:{type:String, required:true},
    price:{type:String, required:true},
    duration:{type:String, required:true},
    likes:{type:Array},
    hashtags:{type:Array, required:true},
    coments:[{
        coment:{type:String},
        userId:{type:mongoose.Types.ObjectId, ref:"users"}
    }],

})
const Itineraries = mongoose.model('itineraries', tinerariesSchema)
module.exports = Itineraries