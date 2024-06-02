import { ACTION_TYPE } from './actionTypes';

export const updateNoteData = (noteData) => ({
  type: ACTION_TYPE.UPDATE_NOTE_DATA,
  payload: noteData,
});
