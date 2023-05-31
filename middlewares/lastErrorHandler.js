const lastErrorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ error: err.message });
  } else {
    res.status(500).send({ error: 'Internal server errorrrr' });
    next();
  }
};

module.exports = lastErrorHandler;
