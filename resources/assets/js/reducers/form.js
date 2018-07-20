import moment from 'moment';
import * as FormActionTypes from '../actiontypes/form';

const initialState = {
  departure_date: moment(new Date()),
  arrival_date:  moment(new Date()),
  origin: "",
  destination: "",
  originName: "",
  destinationName: "",
  originAirport: "",
  destinationAirport: "",
  adults: 1,
  children: 0,
  infants: 0,
  seat_class: "Economy"
}

const MAX_ADULTS = 6;
const MAX_CHILDREN = 6;
// MAX_INFANTS == ADULTS

export default function Form(state=initialState, action){
  switch (action.type) {
    case FormActionTypes.UPDATE_ORIGIN: {
      return {
        ...state,
        origin: action.origin
      };
    }

    case FormActionTypes.UPDATE_DESTINATION: {
      return {
        ...state,
        destination: action.destination
      };
    }

    case FormActionTypes.UPDATE_ORIGIN_NAME: {
      return {
        ...state,
        origin_name: action.origin_name
      };
    }

    case FormActionTypes.UPDATE_DESTINATION_NAME: {
      return {
        ...state,
        destination_name: action.destination_name
      };
    }

    case FormActionTypes.UPDATE_ORIGIN_CITIES: {
      return {
        ...state,
        origin_cities: action.origin_cities
      };
    }

    case FormActionTypes.UPDATE_DESTINATION_CITIES: {
      return {
        ...state,
        destination_cities: action.destination_cities
      };
    }

    case FormActionTypes.UPDATE_DEPARTURE_DATE: {
      var arr_dt = moment(arrival_date.value, "DD MMM YYYY");
      if (action.departure_date > arr_dt) {
        arr_dt = action.departure_date;
      }
      
      return {
        ...state,
        departure_date: action.departure_date,
        arrival_date: arr_dt
      };
    }

    case FormActionTypes.UPDATE_ARRIVAL_DATE: {
      return {
        ...state,
        arrival_date: action.arrival_date
      };
    }

    case FormActionTypes.UPDATE_ADULTS_NUMBERS: {
      if(action.adults_numbers <= MAX_ADULTS && action.adults_numbers > 0){
        return {
          ...state,
          adults: action.adults_numbers
        };
      }else{
        return state;
      }
    }

    case FormActionTypes.UPDATE_CHILDREN_NUMBERS: {
      if(action.children_numbers <= MAX_CHILDREN && action.children_numbers >= 0){
        return {
          ...state,
          children: action.children_numbers
        };
      }else{
        return state;
      }
    }

    case FormActionTypes.UPDATE_INFANTS_NUMBERS: {
      if(action.infants_numbers <= state.adults && action.infants_numbers >= 0){
        return {
          ...state,
          infants: action.infants_numbers
        };
      }else{
        return state;
      }
    }

    case FormActionTypes.UPDATE_SEAT_CLASS: {
      return {
        ...state,
        seat_class: action.seat_class
      };
    }

    default:
      return state;
  }
}
