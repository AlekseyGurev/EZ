import { addDoctorsData } from './addDoctorsData';

export const addDoctorAsync = (data) => (dispatch) =>
  fetch(`/api/doctors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(addDoctorsData(data.data));
      }
      return data;
    });
