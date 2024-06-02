import { updateServiceData } from '.';

export const updateServiceAsync = (id, data, serviceId) => (dispatch) =>
  fetch(`/api/doctors/${id}/service/${serviceId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(updateServiceData(data.data));
      }
      return data;
    });
