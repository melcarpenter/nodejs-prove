const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const company = sequelize.define('company', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
    },
    apiKey: {
      type: Sequelize.STRING,
    },
    apiSecret: {
      type: Sequelize.STRING,
    },
    logo: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    supportUrl: {
      type: Sequelize.STRING,
    },
    twitter: {
      type: Sequelize.STRING,
    },
    telegram: {
      type: Sequelize.STRING,
    },
    coinmarketcap: {
      type: Sequelize.STRING,
    },
    contactEmail: {
      type: Sequelize.STRING,
    },
    challengesTitle: {
      type: Sequelize.STRING,
    },
    challengesDescription: {
      type: Sequelize.TEXT,
    },
    publicUrl: {
      type: Sequelize.STRING,
    },
    properties: {
      type: Sequelize.TEXT,
      get() {
        if (this.getDataValue('properties')) {
          return JSON.parse(this.getDataValue('properties'));
        }
        return {};
      },
      set(value) {
        if (!value) value = {};
        this.setDataValue('properties', JSON.stringify(value));
      },
    },
  },
    {
      timestamp: true
    });

  company.upsert = (values, condition) => (
    company.findOne({ where: condition })
      .then((obj) => {
        if (obj) {
          return obj.update(values);
        }
        return company.create(values);
      })
  );

  company.associate = function (models) {
    this.hasMany(models.user, {
      foreignKey: {
        name: 'companyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.hasOne(models.billing, {
      foreignKey: {
        name: 'companyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.hasMany(models.balance, {
      foreignKey: {
        name: 'companyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.hasMany(models.reward, {
      foreignKey: {
        name: 'companyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.hasMany(models.challenge, {
      foreignKey: {
        name: 'companyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.hasMany(models.wallet, {
      foreignKey: {
        name: 'companyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.hasMany(models.distribution, {
      foreignKey: {
        name: 'companyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };

  return company;
};
