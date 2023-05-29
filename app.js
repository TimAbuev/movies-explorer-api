require('dotenv').config();

const { NODE_ENV } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { NotFoundError } = require('./errors/NotFoundError');
// const allowCORS = require('./middleware/allowCORS');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

// app.use(allowCORS);
app.use(bodyParser.json());
app.use(requestLogger);
app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError('Not found'));
});
app.use(errorLogger);
app.use(errors());

const BASE_URL = NODE_ENV === 'production' ? 'mongodb://api.thecure.nomoredomains.monster:27017/movies' : 'mongodb://localhost:27017/bitfilmsdb';

mongoose.connect(`${BASE_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ error: err.message });
  } else {
    res.status(500).send({ error: 'Internal server errorrrr' });
    next();
  }
});

app.listen(PORT, () => {
  console.log(`privet && app listening on port ${PORT}`);
});
