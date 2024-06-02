const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    info: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
