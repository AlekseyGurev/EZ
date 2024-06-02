const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/doctors', require('./doctors'));
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));

module.exports = router;
