const Sequelize = require('sequelize');
const constants = require('../constants');

const WALLET_PROVIDER = constants.WALLET_PROVIDER;

module.exports = function (sequelize) {
  const address = sequelize.define('address', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    address: {
      type: Sequelize.STRING
    },
    addressProviderId: {
      type: Sequelize.STRING
    },
    walletProvider: {
      type: Sequelize.ENUM(Object.values(WALLET_PROVIDER)),
      defaultValue: WALLET_PROVIDER.BITGO
    },
    memoId: {
      type: Sequelize.STRING
    },
  },
    {
      timestamp: true
    });

  address.associate = function (models) {
    this.belongsTo(models.balance, {
      foreignKey: {
        name: 'balanceId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.belongsTo(models.wallet, {
      foreignKey: {
        name: 'walletId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };
  return address;
};
