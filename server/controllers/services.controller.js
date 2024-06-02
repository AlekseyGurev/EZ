const Service = require('../models/Service');
const Doctor = require('../models/Doctor');

async function addService(doctorId, service) {
  const newService = await Service.create(service);

  await Doctor.findByIdAndUpdate(doctorId, {
    $push: { services: newService },
  });

  return newService;
}

async function editService(id, data) {
  const updateService = await Service.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
  });
  return updateService;
}

async function deleteService(id, serviceId) {
  await Service.deleteOne({ _id: serviceId });
  await Doctor.findByIdAndUpdate(id, { $pull: { specialists: serviceId } });
}

module.exports = {
  addService,
  editService,
  deleteService,
};
