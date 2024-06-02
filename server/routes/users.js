const express = require('express');
const auth = require('../middlewares/checkAuth');

const {
  getUsers,
  deleteUser,
  editUser,
} = require('../controllers/users.controller');
const mapUser = require('../utilities/mapUser');

const router = express.Router({ mergeParams: true });

router.get('/', auth, async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send({ data: users.map(mapUser) });
  } catch (error) {
    res.send({ text: 'ошибка загрузки пользователей', error: true });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.send({ error: false });
  } catch (error) {
    res.send({ text: 'ошибка удаления', error: true });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const updateUser = await editUser(req.params.id, req.body);
    res.send({ data: mapUser(updateUser), error: false });
  } catch (error) {
    res.send({ text: 'ошибка обновления', error: true });
  }
});

module.exports = router;
