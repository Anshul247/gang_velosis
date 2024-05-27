const express = require('express');
const router = express.Router();
const gangController = require('../controllers/gang/index');









router.post('/get-gangs', gangController.getGangs);


module.exports = router;
