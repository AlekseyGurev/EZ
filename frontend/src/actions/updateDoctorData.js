import { ACTION_TYPE } from './actionTypes';

export const updateDoctorData = (doctorData) => ({
  type: ACTION_TYPE.UPDATE_DOCTOR_DATA,
  payload: doctorData,
});
