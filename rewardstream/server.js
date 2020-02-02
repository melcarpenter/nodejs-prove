require('dotenv').config();

global.Promise = require('bluebird');

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
const passport = require('passport');
// const cors = require('cors');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const helmet = require('helmet');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const config = require('./config');
const logger = require('./modules/logger');
const http = require('http');
// const authMiddleWare = require('./middleware/auth');
const dbInitialize = require('./services/dbInitialize');
const routeInitialize = require('./routes');
const passportInitialize = require('./config/passport');
// const seedDb = require('./services/seed.db');
const cronInitialize = require('./services/cron.service');
// const cluster = require('cluster');
const server = http.createServer(app);

// redis session store
const rClient = redis.createClient(config.redis);
const redisSession = session({
  store: new RedisStore({ client: rClient }),
  secret: config.app.secret,
  name: 'JSESSIONID',
  resave: false,
  saveUninitialized: true
});

const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

app.use(morgan('combined', {
  skip: (req, res) => res.statusCode < 400,
  stream: rfs('apiError.log', {
    interval: '1d', // rotate daily
    path: logDirectory
  })
}));
app.use(morgan('combined', {
  skip: (req, res) => res.statusCode >= 400,
  stream: rfs('apiAccess.log', {
    interval: '1d', // rotate daily
    path: logDirectory
  })
}));

// app.options('*', cors());
// app.use(cors());
// Wide-open CORS configuration (change before this is considered production-ready)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://127.0.0.1:3001', 'http://localhost:3001',
    'http://127.0.0.1:3000', 'http://localhost:3000',
    'http://127.0.0.1:8000', 'http://localhost:8000',
    'https://rewardstream.io',
  ];
  if (origin &&
    ((allowedOrigins.indexOf(origin) > -1)
      || origin.endsWith('laughing-kirch-9ce825.netlify.com')
      || origin.endsWith('rewardstream.io'))
  ) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else res.header('Access-Control-Allow-Origin', origin);

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, ApiKey, Signature');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(morgan('dev'));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json({ limit: '50MB' }));
app.use(redisSession);
app.use(require('cookie-parser')());
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
dbInitialize(app);
const user = app.get('models').user;
passportInitialize(passport, user);
app.use(express.static(path.join(__dirname, '/public')));
routeInitialize(app);

app.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).send({
    result: 'error',
    message: err.message,
    error: err
  });
});

(() => {
  try {
    fs.statSync(config.IMAGE_DIR);
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(`Upload image directory does not exist: ${config.IMAGE_DIR}`, error);
      process.exit(1);
    }
  }
  logger.info(`Upload image directory: ${config.IMAGE_DIR}`);
})();

// if (cluster.isMaster && process.env.NODE_ENV !== 'test') {

//   // Count the machine's CPUs
//   const cpuCount = require('os').cpus().length; //eslint-disable-line
//   const workerCount = Math.min(1, cpuCount - 1);
//   logger.info(`Starting ${workerCount} workers`);

//   // Create a worker for each CPU
//   for (let i = 0; i < workerCount; i += 1) {
//     logger.info(`Starting worker: ${i + 1}`);
//     cluster.fork();
//   }

//   // Listen for dying workers
//   cluster.on('exit', (worker) => {
//     // Replace the dead worker, we're not sentimental
//     logger.info(`Worker ${worker.id} died`);
//     logger.info(`Worker ${worker.id} restarting`);
//     cluster.fork();

//   });
//   // if (process.env.pm_id === undefined || Number(process.env.pm_id) === 0) cronInitialize();
//   seedDb();
//   cronInitialize();
// } else {
//   server.listen(config.app.port, () => {
//     server.emit('app_started');
//     logger.info(`Server listening at port ${config.app.port}, process_pid ${process.pid}`);
//   });
// }

if (process.env.NODE_ENV !== 'test') {
  // seedDb();
  cronInitialize();
}

server.listen(config.app.port, () => {
  server.emit('app_started');
  logger.info(`Server listening at port ${config.app.port}, process_pid ${process.pid}`);
});

module.exports = app;
module.exports.close = () => server.close(() => { console.log('exit'); });
