const express = require('express');
const auth = require('../middlewares/checkAuth');

const {
  createDoctor,
  getDoctors,
  getDoctor,
  editDoctor,
  deleteDoctor,
} = require('../controllers/doctors.controller');

const {
  addNote,
  editNote,
  deleteNote,
} = require('../controllers/notes.controller');

const {
  addSpecialist,
  editSpecialist,
  deleteSpecialist,
} = require('../controllers/specialists.controller');

const {
  addService,
  editService,
  deleteService,
} = require('../controllers/services.controller');

const router = express.Router({ mergeParams: true });

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

router.post('/:id/specialist', auth, async (req, res) => {
  try {
    const newSpecialist = await addSpecialist(req.params.id, req.body);
    res.send({ data: newSpecialist, error: false });
  } catch (error) {
    res.send({ text: 'ошибка загрузки', error: true });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newDoctor = await createDoctor(req.body.title);
    res.status(200).send({ data: newDoctor, error: false });
  } catch (error) {
    res.send({ text: 'ошибка отправки', error: true });
  }
});

router.post('/:id/note', auth, async (req, res) => {
  console.log(req.params.id, req.body);
  try {
    const newNote = await addNote(req.params.id, req.body);
    res.send({ data: newNote, error: false });
  } catch (error) {
    res.send({ text: 'ошибка загрузки', error: true });
  }
});

router.post('/:id/service', auth, async (req, res) => {
  console.log(req.params.id, req.body);
  try {
    const newService = await addService(req.params.id, req.body);
    res.send({ data: newService, error: false });
  } catch (error) {
    res.send({ text: 'ошибка загрузки', error: true });
  }
});

router.patch('/:id/specialist/:specialistId', auth, async (req, res) => {
  try {
    const specialist = await editSpecialist(req.params.specialistId, req.body);
    res.send({ data: specialist, error: false });
  } catch (error) {
    res.send({ text: 'ошибка обновления', error: true });
  }
});

router.patch('/:id/note/:noteId', auth, async (req, res) => {
  try {
    const note = await editNote(req.params.noteId, req.body);
    res.send({ data: note, error: false });
  } catch (error) {
    res.send({ text: 'ошибка обновления', error: true });
  }
});

router.patch('/:id/service/:serviceId', auth, async (req, res) => {
  try {
    const service = await editService(req.params.serviceId, req.body);
    res.send({ data: service, error: false });
  } catch (error) {
    res.send({ text: 'ошибка обновления', error: true });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const updateDoctor = await editDoctor(req.params.id, req.body);
    res.send({ data: updateDoctor, error: false });
  } catch (error) {
    res.send({ text: 'ошибка обновления', error: true });
  }
});

router.delete('/:id/specialist/:specialistId', auth, async (req, res) => {
  try {
    const delSpecialist = await deleteSpecialist(
      req.params.id,
      req.params.specialistId
    );
    res.send({ data: delSpecialist, error: false });
  } catch (error) {
    res.send({ text: 'ошибка удаления', error: true });
  }
});

router.delete('/:id/note/:noteId', auth, async (req, res) => {
  try {
    const delNote = await deleteNote(req.params.id, req.params.noteId);
    res.send({ data: delNote, error: false });
  } catch (error) {
    res.send({ text: 'ошибка удаления', error: true });
  }
});

router.delete('/:id/service/:serviceId', auth, async (req, res) => {
  try {
    const delService = await deleteService(req.params.id, req.params.serviceId);
    res.send({ data: delService, error: false });
  } catch (error) {
    res.send({ text: 'ошибка удаления', error: true });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await deleteDoctor(req.params.id);
    res.send({ error: false });
  } catch (error) {
    res.send({ text: 'ошибка удаления', error: true });
  }
});

module.exports = router;
