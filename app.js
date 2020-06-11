require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { PORT, DATABASE_URL } = require('./config.js');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const routes = require('./routes');
const limiter = require('./middlewares/limiter');

const app = express();

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use('/signin', signin);
app.use('/signup', signup);
app.use(auth.auth);
app.use('/', routes);

app.use(errorLogger);

app.use((req, res) => {
  res.status(404).send({ message: 'The requested resource is not found' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send(statusCode === 500 ? { message: 'Internal Server Error' } : message);
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening ${PORT}`);
});
