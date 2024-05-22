const mongoose = require('mongoose');

const SpecialistSchema = mongoose.Schema(
  {
    fio: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
    },
    info: {
      type: String,
    },
    uzi: {
      type: String,
    },
    additionally: {
      type: String,
    },
    price: {
      type: String,
    },
    tel: {
      type: String,
    },
    time: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
);

const Specialist = mongoose.model('Specialist', SpecialistSchema);

module.exports = Specialist;
