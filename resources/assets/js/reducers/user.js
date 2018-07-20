import * as UserActionTypes from '../actiontypes/user';

const initialState = {}

export default function User(state=initialState, action){
  switch (action.type) {
    case UserActionTypes.LOGIN:{
      return action.user;
    }
    case UserActionTypes.UPDATE:{
      return action.user;
    }
    case UserActionTypes.LOGOUT:{
      return {};
    }
    default:
      return state;
  }
}
