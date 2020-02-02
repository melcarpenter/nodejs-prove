const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const whitelistedEmail = sequelize.define('whitelisted_email', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,
    },
    mousebeltUniversity: {
      type: Sequelize.BOOLEAN,
    }
  },
    {
      timestamp: true
    });

  return whitelistedEmail;
};
