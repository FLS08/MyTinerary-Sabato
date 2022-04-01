const mongoose = require('mongoose')

const activitiesSchema = new mongoose.Schema({

    activityName:{type:String, required:true},
    place:{type:String, required:true},
    activityImage:{type:String, required:true},
    itineraryId:{type:mongoose.Types.ObjectId, ref:"itineraries", required:true}

})
const Activities = mongoose.model('activities', activitiesSchema)
module.exports = Activities