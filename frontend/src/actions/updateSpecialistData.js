import { ACTION_TYPE } from './actionTypes';

export const updateSpecialistData = (specialistData) => ({
  type: ACTION_TYPE.UPDATE_SPECIALIST_DATA,
  payload: specialistData,
});
