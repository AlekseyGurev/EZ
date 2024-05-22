const Specialist = require('../models/Specialist');
const Doctor = require('../models/Doctor');

async function addSpecialist(doctorId, specialist) {
  const newSpecialist = await Specialist.create(specialist);

  await Doctor.findByIdAndUpdate(doctorId, {
    $push: { specialists: newSpecialist },
  });

  return newSpecialist;
}

async function editSpecialist(id, data) {
  console.log('tut');
  const updateSpecialist = await Specialist.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
  });
  return updateSpecialist;
}

async function deleteSpecialist(id, specialistId) {
  await Specialist.deleteOne({ _id: specialistId });
  await Doctor.findByIdAndUpdate(id, { $pull: { specialists: specialistId } });
}

module.exports = {
  addSpecialist,
  editSpecialist,
  deleteSpecialist,
};
