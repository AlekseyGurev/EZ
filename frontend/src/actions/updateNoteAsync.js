import { updateNoteData } from './updateNoteData';

export const updateNoteAsync = (id, data, noteId) => (dispatch) =>
  fetch(`/api/doctors/${id}/note/${noteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(updateNoteData(data.data));
      }
      return data;
    });
