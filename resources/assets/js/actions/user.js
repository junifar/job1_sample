import * as UserActionTypes from '../actiontypes/user';

export const login = (user) => {
  return{
    type: UserActionTypes.LOGIN,
    user
  };
}

export const update = (user) => {
  return{
    type: UserActionTypes.UPDATE,
    user
  };
}

export const logout = () => {
  return{
    type: UserActionTypes.LOGOUT
  };
}
