import { ACTION_TYPE } from './actionTypes';

export const addSpecialistData = (specialistData) => ({
  type: ACTION_TYPE.SET_SPECIALIST_DATA,
  payload: specialistData,
});
