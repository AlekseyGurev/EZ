import { ACTION_TYPE } from './actionTypes';

export const setDoctorsData = (doctors) => ({
  type: ACTION_TYPE.SET_DOCTORS_DATA,
  payload: doctors,
});
