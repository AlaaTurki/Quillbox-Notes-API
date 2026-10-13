const express = require('express');
const notesService = require('../services/notes.service');
const parseId = require('../middleware/parseId');
const validateNote = require('../middleware/validateNote');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(notesService.list());
});

router.post('/', validateNote, (req, res) => {
  const note = notesService.create(req.noteData);
  res.location(`/notes/${note.id}`).status(201).json(note);
});

router.get('/:id', parseId, (req, res) => {
  const note = notesService.get(req.noteId);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  return res.status(200).json(note);
});

router.put('/:id', parseId, validateNote, (req, res) => {
  const note = notesService.update(req.noteId, req.noteData);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  return res.status(200).json(note);
});

router.delete('/:id', parseId, (req, res) => {
  if (!notesService.remove(req.noteId)) {
    return res.status(404).json({ error: 'Note not found' });
  }

  return res.status(204).end();
});

module.exports = router;
