import * as FormActionTypes from '../actiontypes/form';

export const updateOrigin = (origin) => {
  return{
    type: FormActionTypes.UPDATE_ORIGIN,
    origin
  };
};

export const updateDestination = (destination) => {
  return{
    type: FormActionTypes.UPDATE_DESTINATION,
    destination
  };
};

export const updateOriginName = (origin_name) => {
  return{
    type: FormActionTypes.UPDATE_ORIGIN_NAME,
    origin_name
  };
};

export const updateDestinationName = (destination_name) => {
  return{
    type: FormActionTypes.UPDATE_DESTINATION_NAME,
    destination_name
  };
};

export const updateOriginCities = (origin_cities) => {
  return{
    type: FormActionTypes.UPDATE_ORIGIN_CITIES,
    origin_cities
  };
};

export const updateDestinationCities = (destination_cities) => {
  return{
    type: FormActionTypes.UPDATE_DESTINATION_CITIES,
    destination_cities
  };
};

export const updateDepartureDate = (departure_date) => {
  return{
    type: FormActionTypes.UPDATE_DEPARTURE_DATE,
    departure_date
  };
};

export const updateArrivalDate = (arrival_date) => {
  return{
    type: FormActionTypes.UPDATE_ARRIVAL_DATE,
    arrival_date
  };
};

export const updateAdultsNumbers = (adults_numbers) => {
  return{
    type: FormActionTypes.UPDATE_ADULTS_NUMBERS,
    adults_numbers
  };
};

export const updateChildrenNumbers = (children_numbers) => {
  return{
    type: FormActionTypes.UPDATE_CHILDREN_NUMBERS,
    children_numbers
  };
};

export const updateInfantsNumbers = (infants_numbers) => {
  return{
    type: FormActionTypes.UPDATE_INFANTS_NUMBERS,
    infants_numbers
  };
};

export const updateSeatClass = (seat_class) => {
  return{
    type: FormActionTypes.UPDATE_SEAT_CLASS,
    seat_class
  };
};
