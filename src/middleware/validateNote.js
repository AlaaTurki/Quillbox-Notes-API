module.exports = function validateNote(req, res, next) {
  const body = req.body;
  const title = body && body.title;
  const content = body && body.content;

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title must be a non-empty string' });
  }

  if (typeof content !== 'string') {
    return res.status(400).json({ error: 'Content must be a string' });
  }

  req.noteData = { title: title.trim(), content };
  return next();
};
