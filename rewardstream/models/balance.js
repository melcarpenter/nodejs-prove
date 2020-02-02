const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const balance = sequelize.define('balance', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    amount: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
    price: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
  },
    {
      timestamp: true
    });

  balance.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
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
    this.hasMany(models.address, {
      foreignKey: {
        name: 'balanceId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };
  return balance;
};
