import * as ItinerariesActionTypes from '../actiontypes/itineraries';

const initialState = []

export default function Itineraries(state=initialState, action){
  switch (action.type) {
    case ItinerariesActionTypes.UPDATE_ITINERARIES:{
      return action.itineraries;
    }
    default:
      return state;
  }
}
