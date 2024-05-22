const express = require('express');

const {
  createDoctor,
  getDoctors,
  getDoctor,
  editDoctor,
  deleteDoctor,
} = require('../controllers/doctors.controller');

const {
  addSpecialist,
  editSpecialist,
  deleteSpecialist,
} = require('../controllers/specialists.controller');

const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
  try {
    const newDoctor = await createDoctor(req.body.title);
    res.status(200).send({ data: newDoctor, error: false });
  } catch (error) {
    res.send({ text: 'ошибка отправки', error: true });
  }
});

router.get('/', async (req, res) => {
  try {
    const doctors = await getDoctors();
    res.status(200).json({ doctors });
  } catch (error) {
    res.send({ text: 'ошибка загрузки', error: true });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doctor = await getDoctor(req.params.id);
    res.status(200).json({ doctor });
  } catch (error) {
    res.send({ text: 'ошибка загрузки', error: true });
  }
});

router.post('/:id/specialist', async (req, res) => {
  try {
    const newSpecialist = await addSpecialist(req.params.id, req.body);
    res.send({ data: newSpecialist, error: false });
  } catch (error) {
    res.send({ text: 'ошибка загрузки', error: true });
  }
});

router.patch('/:id/specialist/:specialistId', async (req, res) => {
  try {
    const specialist = await editSpecialist(req.params.specialistId, req.body);
    res.send({ data: specialist, error: false });
  } catch (error) {
    res.send({ text: 'ошибка обновления', error: true });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updateDoctor = await editDoctor(req.params.id, req.body);
    res.send({ data: updateDoctor, error: false });
  } catch (error) {
    res.send({ text: 'ошибка обновления', error: true });
  }
});

router.delete('/:id/specialist/:specialistId', async (req, res) => {
  try {
    const delSpecialist = await deleteSpecialist(
      req.params.id,
      req.params.specialistId
    );
    res.send({ data: delSpecialist, error: false });
  } catch (error) {
    res.send({ text: 'ошибка обновления', error: true });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteDoctor(req.params.id);
    res.send({ error: false });
  } catch (error) {
    res.send({ text: 'ошибка обновления', error: true });
  }
});

module.exports = router;
