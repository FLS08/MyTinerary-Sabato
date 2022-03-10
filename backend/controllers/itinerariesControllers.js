const Itineraries = require("../models/itineraries");

const itinerariesControllers = {
  getItineraries: async (req, res) => {
    let itineraries;
    let error = null;
    try {
      itineraries = await Itineraries.find();
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" : { itineraries },
      success: error ? false : true,
      error: error,
    });
  },
  loadItineraries: async (req, res) => {
    console.log(req.body);
    const {city,city_id,country,imgUser,userName,itineraryName,price,duration,likes,hashtags,coments} = req.body;
    new Itineraries({
      city,
      city_id,
      country,
      imgUser,
      userName,
      itineraryName,
      price,
      duration,
      likes,
      hashtags,
      coments,
    })
      .save()
      .then((response) => res.json({ response:response, success:true }));
  },

  deleteItineraries: async (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    await Itineraries.findOneAndDelete({ _id: id });
  },
  modifiItneraries: async (req, res) => {
    const id = req.params.id;
    const itinerary = req.body;
    let itinerariesdb;
    try{itinerariesdb = await Itineraries.findOneAndUpdate({ _id: id }, itinerary,{new: true});
    }catch(err){
        console.log(err)
    }res.json({success:true, response:itinerariesdb})
  },
  getOneItinerary: async (req, res) => {
    let itineraries;
    let error = null;
    try {
      itineraries = await Itineraries.findOne({_id:req.params.id});
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" :  itineraries ,
      success: error ? false : true,
      error: error,
    });
  }

    
};

module.exports = itinerariesControllers;