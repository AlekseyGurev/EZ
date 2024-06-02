import { ACTION_TYPE } from './actionTypes';

export const deleteNoteData = (noteData) => ({
  type: ACTION_TYPE.DEL_NOTE_DATA,
  payload: noteData,
});
