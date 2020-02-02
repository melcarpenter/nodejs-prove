const Sequelize = require('sequelize');
const { TRANSACTION_STATUS } = require('../constants');

module.exports = function (sequelize) {
  const transaction = sequelize.define('transaction', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    txHash: {
      type: Sequelize.STRING
    },
    coin: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM(Object.values(TRANSACTION_STATUS)),
      defaultValue: TRANSACTION_STATUS.PENDING
    },
    amount: {
      type: Sequelize.FLOAT
    },
    platformFee: {
      type: Sequelize.FLOAT
    },
    transactionFee: {
      type: Sequelize.FLOAT
    },
    address: {
      type: Sequelize.STRING
    },
    total: {
      type: Sequelize.FLOAT
    },
    transactionType: {
      type: Sequelize.ENUM(),
      values: ['deposit', 'withdrawal'],
      allowNull: true
    }
  },
    {
      timestamp: true
    });

  transaction.associate = function (models) {
    this.belongsTo(models.balance, {
      foreignKey: {
        name: 'balanceId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };

  return transaction;
};
