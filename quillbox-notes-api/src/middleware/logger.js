module.exports = function logger(req, res, next) {
  const startedAt = Date.now();

  res.once('finish', () => {
    const elapsed = Date.now() - startedAt;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${elapsed}ms)`);
  });

  next();
};
