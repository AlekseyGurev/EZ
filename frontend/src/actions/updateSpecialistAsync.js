import { updateSpecialistData } from '.';

export const updateSpecialistAsync = (id, data, specialistId) => (dispatch) =>
  fetch(`/api/doctors/${id}/specialist/${specialistId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(updateSpecialistData(data.data));
      }
      return data;
    });
