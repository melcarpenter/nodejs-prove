const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const express = require('express');
const app = require('express')();
const passport = require('passport');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const config = require('./config');
const logger = require('./utils/logger');
const dbInitialize = require('./services/dbInitialize');

dbInitialize(app);
app.logger = logger;

const allowedOrigins = ['http://127.0.0.1:3001', 'http://localhost:3001', 'https://turncoin.io', 'https://demo.turncoin.io',
  'https://www.turncoin.io', 'http://127.0.0.1:3000', 'http://localhost:3000',
  /turncoin\-demo\.netlify\.com/, /xchange\-web\.netlify\.com/]; // eslint-disable-line
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (
    origin
    && (
      (allowedOrigins.indexOf(origin) > -1)
      || origin.endsWith('turncoin-demo.netlify.com')
      || origin.endsWith('xchange-web.netlify.com')
    )
  ) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else { res.header('Access-Control-Allow-Origin', origin); }

  // res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, ApiKey, Signature');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});

// app.options('*', cors());
// app.use(cors());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//     next();
// });
// const whitelistOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://turncoin.io', 'http://turncoin.io'];
// const corsOptions = {
//     origin: function origin(org, callback) {
//         if(whitelistOrigins.includes(org) || typeof org === 'undefined' || org.endsWith('.turncoin.io')) {
//             return  callback(null, true);
//         }
//         return callback(new Error('Not allowed by CORS'));
//     },
//     credentials: true
// };
// app.use(cors(corsOptions));

app.use(require('morgan')('dev'));
app.use(require('body-parser').urlencoded({ limit: '50mb', extended: true }));
app.use(require('body-parser').json({ limit: '50mb' }));
app.use(require('cookie-parser')());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

const sessionStore = new SequelizeStore({
  db: app.get('sequelize'),
  // The interval at which to cleanup expired sessions in milliseconds.
  checkExpirationInterval: 15 * 60 * 1000,
  // The maximum age (in milliseconds) of a valid session.
  expiration: 24 * 60 * 60 * 1000
});
app.use(session({
  secret: config.app.secret, resave: false, saveUninitialized: true, store: sessionStore
}));
sessionStore.sync();
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(passport.initialize());
app.use(passport.session());
require('./models');
require('./config/passport');

/**
 * API routes
 */
app.use(require('./routes'));

app.listen(config.app.port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('>>> 🌎 Server listening on port', config.app.port);
});
