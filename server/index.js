require('dotenv').config();
const mongoose = require('mongoose');
const chalk = require('chalk');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes/index');

const port = 3005;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/', express.static('../frontend/dist/'));
app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('../frontend/dist/index.html'));
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(chalk.green(`server has been started on port ${port}...`));
  });
});
