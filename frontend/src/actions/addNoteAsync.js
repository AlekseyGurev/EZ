import { addNoteData } from './addNoteData';

export const addNoteAsync = (id, data) => (dispatch) =>
  fetch(`/api/doctors/${id}/note`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(addNoteData(data.data));
      }
      return data;
    });
