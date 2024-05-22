import { ACTION_TYPE } from './actionTypes';

export const deleteSpecialistData = (specialistData) => ({
  type: ACTION_TYPE.DEL_SPECIALIST_DATA,
  payload: specialistData,
});
