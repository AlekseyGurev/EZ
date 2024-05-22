import { ACTION_TYPE } from './actionTypes';

export const addDoctorsData = (doctorsData) => ({
  type: ACTION_TYPE.UPDATE_DOCTORS_DATA,
  payload: doctorsData,
});
