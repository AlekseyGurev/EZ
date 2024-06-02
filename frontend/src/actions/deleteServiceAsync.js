import { deleteServiceData } from '.';

export const deleteServiceAsync = (doctorId, id) => (dispatch) =>
  fetch(`/api/doctors/${doctorId}/service/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(deleteServiceData(id));
      }
      return data;
    });
