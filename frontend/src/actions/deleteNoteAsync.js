import { deleteNoteData } from './deleteNoteData';

export const deleteNoteAsync = (doctorId, id) => (dispatch) =>
  fetch(`/api/doctors/${doctorId}/note/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(deleteNoteData(id));
      }
      return data;
    });
