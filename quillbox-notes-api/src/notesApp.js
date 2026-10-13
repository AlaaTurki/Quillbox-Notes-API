const express = require('express');
const logger = require('./middleware/logger');
const notesRouter = require('./routes/notes.routes');

const app = express();

app.use(logger);
app.use(express.json());
app.use('/notes', notesRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Malformed JSON' });
  }

  return res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
