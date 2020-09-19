const { request } = require('express');
const express = require('express');
const router = express.Router();


const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
res.render('notes/new-note');
});

    router.post('/notes/new-note', async (req, res) => {
    const {
        title,
        description
    } = req.body;
    const errors = [];
    if (!title) {
        errors.push({
            text: 'por favor inserte un titulo'
        });
    }
    if (!description) {
        errors.push({
            text: 'por favor ingrese un texto'
        });
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({title,description});
        await newNote.save();
        console.log("nota creada");
        res.redirect('/notes');
    }
});
// router.get('/notes', async (req, res) => {
   

// const notes = await Note.find();
// res.render('notes/all-notes', { notes})

//  });
router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({
        date: 'desc'
    });
    res.render('notes/all-notes', {
        notes
    });
});

module.exports = router;