const Cities = require('../models/cities')

const citiesControllers = {

getCities: async (req,res)=>{
let cities
let error = null
try{

 cities = await Cities.find()

}catch(err){
    error = err
    console.log(error)
}
res.json({
    response: error ? 'ERROR' : {cities}, 
    success: error ? false : true,
    error: error
})
},
loadCities: async(req, res)=>{
    console.log(req.body)
    const {city, country, description}= req.body.dataInput
    new Cities({
        city: city,
        country:country,
        description: description,
    }).save()
    .then((response)=> res.json({response}))
},

deleteCities: async (req, res)=>{
    const id = req.params.id
    console.log(req.params);
    await Cities.findOneAndDelete({_id:id})
},
modifiCities: async (req, res)=>{
    const id = req.params.id
    const ciudad = req.body.dataInput

    let ciudadb = await Cities.findOneAndUpdate({_id:id}, ciudad)
    console.log(ciudadb)
}
}
module.exports = citiesControllers