import { ACTION_TYPE } from './actionTypes';

export const updateServiceData = (serviceData) => ({
  type: ACTION_TYPE.UPDATE_SERVICE_DATA,
  payload: serviceData,
});
