import * as ItinerariesActionTypes from '../actiontypes/itineraries';

export const updateItineraries = (itineraries) => {
  return{
    type: ItinerariesActionTypes.UPDATE_ITINERARIES,
    itineraries
  };
}
