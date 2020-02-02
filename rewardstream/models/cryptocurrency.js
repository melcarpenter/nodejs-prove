const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const cryptocurrency = sequelize.define('cryptocurrency', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    short: {
      type: Sequelize.STRING
    },
    long: {
      type: Sequelize.STRING
    },
    coinmarketcapId: {
      type: Sequelize.STRING
    },
  });

  cryptocurrency.upsert = (values, condition) => (
    cryptocurrency.findOne({ where: condition })
      .then((obj) => {
        if (obj) {
          return obj.update(values);
        }
        return cryptocurrency.create(values);
      })
  );

  // cryptocurrency.associate = function (models) {
  //   this.hasMany(models.distribution, {
  //     foreignKey: {
  //       name: 'cryptocurrencyId',
  //       allowNull: true
  //     },
  //     onDelete: 'SET NULL'
  //   });
  //   this.hasMany(models.balance, {
  //     foreignKey: {
  //       name: 'cryptocurrencyId',
  //       allowNull: true
  //     },
  //     onDelete: 'SET NULL'
  //   });
  // };
  return cryptocurrency;
};
