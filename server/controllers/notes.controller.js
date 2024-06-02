const Doctor = require('../models/Doctor');
const Note = require('../models/Note');

async function addNote(doctorId, note) {
  console.log(note);
  const newNote = await Note.create(note);

  await Doctor.findByIdAndUpdate(doctorId, {
    $push: { notes: newNote },
  });

  return newNote;
}

async function editNote(id, data) {
  const updateNote = await Note.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
  });
  return updateNote;
}

async function deleteNote(id, noteId) {
  await Note.deleteOne({ _id: noteId });
  await Doctor.findByIdAndUpdate(id, { $pull: { notes: noteId } });
}

module.exports = {
  addNote,
  editNote,
  deleteNote,
};
