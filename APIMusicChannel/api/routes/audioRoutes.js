const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');

router.get('/audios', audioController.getAudioFiles);

module.exports = router;
