const chalk = require('chalk');
const Doctor = require('../models/Doctor');
const Note = require('../models/Note');
const Service = require('../models/Service');
const Specialist = require('../models/Specialist');

async function createDoctor(title) {
  const newDoctor = await Doctor.create({
    title,
  });
  console.log(chalk.green.inverse('Record was added!'));
  return newDoctor;
}

async function getDoctors() {
  const data = await Doctor.find();
  return data;
}

async function getDoctor(id) {
  return await Doctor.findById(id)
    .populate({
      path: 'specialists',
    })
    .populate({ path: 'notes' })
    .populate({ path: 'services' });
}

async function editDoctor(id, doctor) {
  const updateDoctor = await Doctor.findByIdAndUpdate(id, doctor, {
    returnDocument: 'after',
  });
  return updateDoctor;
}

async function deleteDoctor(id) {
  await Specialist.deleteMany({ author: id });
  await Note.deleteMany({ author: id });
  await Service.deleteMany({ author: id });
  return await Doctor.deleteOne({ _id: id });
}

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  editDoctor,
  deleteDoctor,
};
