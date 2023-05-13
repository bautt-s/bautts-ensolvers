const express = require('express');
const prisma = require('../../prisma/prisma.js')
const router = express.Router();

// main route to get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await prisma.note.findMany({})

        if (notes.length) res.status(200).send(notes);
        else res.status(404).send('ERROR: Could not find any notes');
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.')
    }
})

// route to create a note
router.post('/', async (req, res) => {
    try {
        const bodyNote = req.body

        const createdNote = await prisma.note.create({
            data: {
                title: bodyNote.title || 'Unnamed Note',
                content: bodyNote.content,
                category: bodyNote.category,
                active: true
            }
        })

        res.status(200).send(createdNote);
    } catch (error) {
        console.log(error)
        res.status(400).send('ERROR: There was an unexpected error.')
    }
})

// enable and disable routes are made to archive/unarchive notes
router.put('/enable', async (req, res) => {
    try {
        const { id } = req.body
        
        await prisma.note.update({
            where: { id },
            data: { active: true },
        });

        res.status(200).send({message: `Note ${id} enabled successfully`})
    } catch (error) {
        console.log(error)
        res.status(400).send('ERROR: There was an unexpected error.')
    }
})

router.put('/disable', async (req, res) => {
    try {
        const { id } = req.body
        
        await prisma.note.update({
            where: { id },
            data: { active: false },
        });

        res.status(200).send({message: `Note ${id} enabled successfully`})
    } catch (error) {
        console.log(error)
        res.status(400).send('ERROR: There was an unexpected error.')
    }
})

// route needed to edit notes
router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const bodyNote = req.body

        const createdNote = await prisma.note.update({
            where: { id },
            data: {
                title: bodyNote.title,
                content: bodyNote.content,
                category: bodyNote.category,
                active: true
            }
        })

        res.status(200).send(createdNote);
    } catch (error) {
        console.log(error)
        res.status(400).send('ERROR: There was an unexpected error.')
    }
})

// route needed to delete a certain note
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const note = await prisma.note.delete({
            where: { id },
        });

        note ? res.status(200).send('Note deleted succesfully.') : res.status(404).send("ERROR: ID could not be found.");
    } catch (error) {
        console.log(error)
        res.status(400).send('ERROR: There was an unexpected error.')
    }
})

module.exports = router;