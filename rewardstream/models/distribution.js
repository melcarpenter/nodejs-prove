const Sequelize = require('sequelize');
const { DISTRIBUTION_STATUS, DISTRIBUTION_METHOD } = require('../constants');

module.exports = function (sequelize) {
  const distribution = sequelize.define('distribution', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    start: {
      type: Sequelize.DATE,
    },
    end: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.ENUM(Object.values(DISTRIBUTION_STATUS)),
      defaultValue: DISTRIBUTION_STATUS.VALID
    },
    amount: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
    distributionMethod: {
      type: Sequelize.ENUM(Object.values(DISTRIBUTION_METHOD)),
      defaultValue: DISTRIBUTION_METHOD.USERID
    },
    identity: {
      type: Sequelize.STRING,
    },
    claimed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    claimCode: {
      type: Sequelize.STRING,
    },
    claimDate: {
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.STRING,
    },
    notified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
    {
      timestamp: true
    });

  distribution.associate = function (models) {
    this.belongsTo(models.reward, {
      foreignKey: {
        name: 'rewardId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.belongsTo(models.company, {
      foreignKey: {
        name: 'companyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.belongsTo(models.cryptocurrency, {
      foreignKey: {
        name: 'cryptocurrencyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };
  return distribution;
};
