import { updateDoctorData } from '.';

export const updateDoctorAsync = (id, data) => (dispatch) =>
  fetch(`/api/doctors/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(updateDoctorData(data.data));
      }
      return data;
    });
