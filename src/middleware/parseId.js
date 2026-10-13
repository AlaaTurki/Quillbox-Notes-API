module.exports = function parseId(req, res, next) {
  const rawId = req.params.id;

  if (!/^\d+$/.test(rawId)) {
    return res.status(400).json({ error: 'Invalid note id' });
  }

  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid note id' });
  }

  req.noteId = id;
  return next();
};
