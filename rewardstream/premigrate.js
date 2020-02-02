require('dotenv').config();
global.Promise = require('bluebird');
const models = require('./models');
const logger = require('./modules/logger');
models.sequelize.sync()
  .then(() => {
    logger.info('Sequelize synced');
    process.exit(0);
  })
  .catch((error) => {
    logger.error(`Sequelize sync failed: ${error.message}`);
    process.exit(1);
  });
