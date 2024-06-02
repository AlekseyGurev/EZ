import { addServiceData } from './';

export const addServiceAsync = (id, data) => (dispatch) =>
  fetch(`/api/doctors/${id}/service`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(addServiceData(data.data));
      }
      return data;
    });
