const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    price: {
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

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
