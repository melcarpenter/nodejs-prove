const Sequelize = require('sequelize');
const { PRICE_SOURCE } = require('../constants');

module.exports = function (sequelize) {
  const price = sequelize.define('price', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    time: {
      type: Sequelize.DATE,
    },
    source: {
      type: Sequelize.ENUM(Object.values(PRICE_SOURCE)),
      defaultValue: PRICE_SOURCE.COINMARKETCAP
    },
    value: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
  },
    {
      timestamp: true
    });

  price.upsert = (values, condition) => (
    price.findOne({ where: condition })
      .then((obj) => {
        if (obj) {
          return obj.update(values);
        }
        return price.create(values);
      })
  );

  price.associate = function (models) {
    this.belongsTo(models.cryptocurrency, {
      foreignKey: {
        name: 'cryptocurrencyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };
  return price;
};
