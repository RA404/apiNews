require('dotenv').config();
const cors = require('cors');
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
const signout = require('./routes/signout');
const routes = require('./routes');
const limiter = require('./middlewares/limiter');

const app = express();

const corsOptions = {
  origin: [
    'http://api2.ra404.ru',
    'http://localhost:3000',
    'http://ra404.ru',
    'http://apinews.ra404.ru',
    'http://news.ra404.ru',
    'https://api2.ra404.ru',
    'https://localhost:3000',
    'https://ra404.ru',
    'https://apinews.ra404.ru',
    'https://news.ra404.ru',
    'https://ra404.github.io/',
  ],
  credentials: true,
};

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use('/signin', signin);
app.use('/signup', signup);
app.use('/signout', signout);
app.use(auth.auth);
app.use('/', routes);

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send(statusCode === 500 ? { message: 'Internal Server Error' } : message);
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening ${PORT}`);
});
