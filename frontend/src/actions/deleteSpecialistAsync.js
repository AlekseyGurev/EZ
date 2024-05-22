import { deleteSpecialistData } from '.';

export const deleteSpecialistAsync = (doctorId, id) => (dispatch) =>
  fetch(`/api/doctors/${doctorId}/specialist/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(deleteSpecialistData(id));
      }
      return data;
    });
