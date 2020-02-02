const Sequelize = require('sequelize');
const { WALLET_PROVIDER, WALLET_TYPE } = require('../constants');

module.exports = function (sequelize) {
  const wallet = sequelize.define('wallet', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    coin: {
      type: Sequelize.STRING
    },
    walletProvider: {
      type: Sequelize.ENUM(Object.values(WALLET_PROVIDER)),
      defaultValue: WALLET_PROVIDER.BITGO
    },
    walletType: {
      type: Sequelize.ENUM(Object.values(WALLET_TYPE)),
      defaultValue: WALLET_TYPE.DEPOSIT
    },
    walletProviderId: {
      type: Sequelize.STRING
    },
    passphrase: {
      type: Sequelize.STRING
    },
    label: {
      type: Sequelize.STRING
    },
    backupXpub: {
      type: Sequelize.STRING
    },
    encryptedXprv: {
      type: Sequelize.STRING
    },
    backupEncryptedXprv: {
      type: Sequelize.STRING
    },
  },
    {
      timestamp: true
    });


  return wallet;
};
