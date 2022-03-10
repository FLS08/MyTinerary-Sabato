const initialState = {
  itineraries: [],
  itinerary: [],
  aux: [],
  filtItineraries: [],
};

const itinerariesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetch":
      return {
        ...state,
        itineraries: action.payload,
        aux: action.payload,
      };
    case "deleteItinerary":
      return {
        ...state,
        itineraries: action.payload,
      };

    case "loadItinerary":
      let itineraries = [...state.itineraries];
      itineraries.push(action.payload);
      return {
        ...state,
        itineraries,
        aux: [...itineraries],
      };

    case "fetchOneItinerary":
      return {
        ...state,
        itinerary: action.payload,
      };
    default:
      return state;
  }
};

export default itinerariesReducer;
