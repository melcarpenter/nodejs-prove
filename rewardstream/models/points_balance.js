const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const pointsBalance = sequelize.define('points_balance', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    balance: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
  },
    {
      timestamp: true
    });

  pointsBalance.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.belongsTo(models.reward, {
      foreignKey: {
        name: 'rewardId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };
  return pointsBalance;
};
