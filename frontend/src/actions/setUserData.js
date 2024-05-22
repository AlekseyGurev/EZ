import { ACTION_TYPE } from './actionTypes';

export const setUserData = (user) => ({
  type: ACTION_TYPE.SET_USER_DATA,
  payload: user,
});
