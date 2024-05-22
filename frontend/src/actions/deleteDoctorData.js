import { ACTION_TYPE } from './actionTypes';

export const deleteDoctorData = (doctorId) => ({
  type: ACTION_TYPE.DELETE_DOCTOR_DATA,
  payload: doctorId,
});
