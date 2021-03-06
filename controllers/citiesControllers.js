const Cities = require("../models/cities");

const citiesControllers = {
  getCities: async (req, res) => {
    let cities;
    let error = null;
    try {
      cities = await Cities.find();
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" : { cities },
      success: error ? false : true,
      error: error,
    });
  },
  loadCities: async (req, res) => {
    const { city, country, description } = req.body;
    new Cities({
      city,
      country,
      description,
    })
      .save()
      .then((response) => res.json({ response:response, success:true }));
  },

  deleteCities: async (req, res) => {
    const id = req.params.id;
    await Cities.findOneAndDelete({ _id: id });
  },
  modifiCities: async (req, res) => {
    const id = req.params.id;
    const city = req.body;
    let citiesdb;
    try{citiesdb = await Cities.findOneAndUpdate({ _id: id }, city,{new: true});
    }catch(err){
        console.log(err)
    }res.json({success:true, response:citiesdb})
  },
  getOneCity: async (req, res) => {
    let cities;
    let error = null;
    try {
      cities = await Cities.findOne({_id:req.params.id});
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" :  cities ,
      success: error ? false : true,
      error: error,
    });
  }

    
};
module.exports = citiesControllers;
