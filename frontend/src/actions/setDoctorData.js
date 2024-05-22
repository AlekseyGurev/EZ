import { ACTION_TYPE } from './actionTypes';

export const setDoctorData = (doctor) => ({
  type: ACTION_TYPE.SET_DOCTOR_DATA,
  payload: doctor,
});
