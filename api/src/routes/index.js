const { Router } = require('express');
const notesRouter = require('./notes.js')

const router = Router();

router.use('/notes', notesRouter)

module.exports = router;