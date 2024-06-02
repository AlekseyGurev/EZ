import { ACTION_TYPE } from './actionTypes';

export const addServiceData = (serviceData) => ({
  type: ACTION_TYPE.SET_SERVICE_DATA,
  payload: serviceData,
});
