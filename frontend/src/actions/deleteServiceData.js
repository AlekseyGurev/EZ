import { ACTION_TYPE } from './actionTypes';

export const deleteServiceData = (serviceData) => ({
  type: ACTION_TYPE.DEL_SERVICE_DATA,
  payload: serviceData,
});
