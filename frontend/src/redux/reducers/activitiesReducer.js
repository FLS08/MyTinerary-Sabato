const initialState = {
    activities: [],
    aux: [],
  };
  
  const activitiesReducer = (state = initialState, action) => {

    switch (action.type) {

      case "fetchAct":
        return {
          ...state,
          activities: action.payload,
          aux: action.payload,
        };
  
      case "fetchActivities":
        return {
          ...state,
          activities: action.payload,
          aux: action.payload,
        };
  
  
      default:
        return state;
    }
  };
  
  export default activitiesReducer;