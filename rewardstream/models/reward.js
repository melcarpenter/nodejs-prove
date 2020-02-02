const Sequelize = require('sequelize');
const { REWARD_TYPE } = require('../constants');

module.exports = function (sequelize) {
  const reward = sequelize.define('reward', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    code: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4
    },
    uniqueCode: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    type: {
      type: Sequelize.ENUM(Object.values(REWARD_TYPE)),
      defaultValue: REWARD_TYPE.POINTS
    },
    name: {
      type: Sequelize.STRING,
    },
    valid: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    description: {
      type: Sequelize.STRING,
    },
    terms: {
      type: Sequelize.STRING,
    },
    expiration: {
      type: Sequelize.DATE,
    },
    daysValid: {
      type: Sequelize.INTEGER,
    },
    amountOff: {
      type: Sequelize.INTEGER,
    },
    percentOff: {
      type: Sequelize.INTEGER
    },
    maxRedemptions: {
      type: Sequelize.INTEGER
    },
    numRedemptions: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    image: {
      type: Sequelize.STRING
    },
  },
    {
      timestamp: true
    });

  reward.upsert = (values, condition) => (
    reward.findOne({ where: condition })
      .then((obj) => {
        if (obj) {
          return obj.update(values);
        }
        return reward.create(values);
      })
  );

  reward.associate = function (models) {
    this.hasMany(models.distribution, {
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
  };

  return reward;
};
