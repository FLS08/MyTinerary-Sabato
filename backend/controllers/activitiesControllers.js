const Activities = require("../models/activities");

const activitiesControllers = {
  getActivities: async (req, res) => {
    let activities;
    let error = null;
    try {
      activities = await Activities.find();
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" : { activities },
      success: error ? false : true,
      error: error,
    });
  },

  loadActivities: async (req, res) => {
    const { activityName, place, activityImage, itineraryId } = req.body;
    new Activities({
      activityName,
      place,
      activityImage,
      itineraryId,
    })
      .save()
      .then((response) => res.json({ response: response, success: true }));
  },

  deleteActivities: async (req, res) => {
    const id = req.params.id;
    await Activities.findOneAndDelete({ _id: id });
  },

  modifiActivities: async (req, res) => {
    const id = req.params.id;
    const activity = req.body;
    let activitiesdb;
    try {
      activitiesdb = await Activities.findOneAndUpdate({ _id: id }, activity, {
        new: true,
      });
    } catch (err) {
      console.log(err);
    }
    res.json({ success: true, response: activitiesdb });
  },
  getActivitiesByItineraryId: async (req, res) => {
    let activities;
    let error = null;
    try {
      activities = await Activities.find({itineraryId:req.params.id});
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" :  activities ,
      success: error ? false : true,
      error: error,
    });
  },

  
};

module.exports = activitiesControllers;