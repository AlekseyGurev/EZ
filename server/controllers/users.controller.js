const chalk = require('chalk');
const Users = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');

async function createUser(login, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await Users.create({
    login,
    password: passwordHash,
  });

  const token = jwt.sign({ login }, JWT_SECRET, { expiresIn: '30d' });
  console.log(chalk.green.inverse('User was added!'));
  return { user, token };
}

async function getUser(login, password) {
  const user = await Users.findOne({
    login,
  });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('неверный пароль');
  }

  const token = jwt.sign({ login }, JWT_SECRET, { expiresIn: '30d' });

  return { user, token };
}

module.exports = {
  createUser,
  getUser,
};
