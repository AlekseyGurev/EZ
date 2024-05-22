const express = require('express');
const { getUser, createUser } = require('../controllers/users.controller');
const mapUser = require('../utilities/mapUser');

const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
  try {
    const { token, user } = await getUser(req.body.login, req.body.password);
    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: false, user: mapUser(user) });
  } catch (error) {
    res.send({ text: 'ошибка входа', error: true });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await createUser(req.body.login, req.body.password);
    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: false, user: mapUser(user) });
  } catch (error) {
    res.send({ text: 'ошибка регистрации', error: true });
  }
});

router.post('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true }).send({});
});

module.exports = router;
