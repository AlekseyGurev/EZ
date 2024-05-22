import { addSpecialistData } from '.';

export const addSpecialistAsync = (id, data) => (dispatch) =>
  fetch(`/api/doctors/${id}/specialist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(addSpecialistData(data.data));
      }
      return data;
    });
