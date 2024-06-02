import { ACTION_TYPE } from './actionTypes';

export const addNoteData = (noteData) => ({
  type: ACTION_TYPE.SET_NOTE_DATA,
  payload: noteData,
});
