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
      itineraries = await Itineraries.find({city_id:req.params.id}).populate("coments.userId");
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" :  itineraries ,
      success: error ? false : true,
      error: error,
    });
  },
  likeDislike: async (req,res) =>{


    const id= req.params.id;
    const user= req.user.id.toString();
    let tinerario

    try {
      tinerario = await Itineraries.findOne({_id: id });

      
      if(tinerario.likes.includes(user)){
        Itineraries.findOneAndUpdate({_id:id}, {$pull:{likes:user}}, {new: true})
        .then(response => res.json({success:true, response:response.likes}))
        .catch(error => console.log(error))
      } else{
        Itineraries.findOneAndUpdate({_id:id}, {$push:{likes:user}}, {new: true})
        .then(response => res.json({success:true, response:response.likes}))
        .catch(error => console.log(error))
      }
    } catch (err) {
      const error = err;
      res.json({success:false, response:error});
    }
    

  }
  

    
};

module.exports = itinerariesControllers;