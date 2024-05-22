import { deleteDoctorData } from '.';

export const deleteDoctorAsync = (doctorId) => (dispatch) =>
  fetch(`/api/doctors/${doctorId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(deleteDoctorData(doctorId));
      }
      return data;
    });
