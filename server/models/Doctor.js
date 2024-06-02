const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    specialists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialist',
      },
    ],
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
      },
    ],
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
