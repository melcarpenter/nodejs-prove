/* eslint-disable */

require('dotenv').config();

const models = require('./models');

models.sequelize.sync()
    .then(() => {
        console.log('Sequelize synced');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Sequelize sync failed:', error);
        process.exit(1);
    });
