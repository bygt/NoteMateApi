const express = require('express');
const { createNote, getNotes } = require('../controllers/noteController');
const router = express.Router();

router.post('/create', createNote);
router.get('/', getNotes);


module.exports = router;
