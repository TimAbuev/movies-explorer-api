require('dotenv').config();

const { NODE_ENV, URL } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
// const allowCORS = require('./middlewares/allowCORS');
const routes = require('./routes/index');
const { NotFoundError } = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const lastErrorHandler = require('./middlewares/lastErrorHandler');

const { PORT = 3000 } = process.env;
const app = express();

// app.use(allowCORS);
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(requestLogger);
app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError('Not found'));
});
app.use(errorLogger);
app.use(errors());
const BASE_URL = NODE_ENV === 'production' ? URL : 'mongodb://localhost:27017/bitfilmsdb';

mongoose.connect(`${BASE_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(lastErrorHandler);

app.listen(PORT, () => {
  console.log(`privet && app listening on port ${PORT}`);
});
