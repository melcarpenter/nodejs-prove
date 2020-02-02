const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const oauth = sequelize.define('oauth', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,
    },
    metadata: {
      type: Sequelize.STRING,
    },
    network: {
      type: Sequelize.STRING,
    },
    nId: {
      type: Sequelize.STRING,
    },
    requestSecret: {
      type: Sequelize.STRING,
    },
    accessToken: {
      type: Sequelize.STRING,
    },
    accessTokenSecret: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    coinbaseState: {
      type: Sequelize.STRING
    }
  },
    {
      timestamp: true
    });
  oauth.associate = function (models) {
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
  };
  oauth.upsert = (values, condition) => (
    oauth.findOne({ where: condition })
      .then((obj) => {
        if (obj) {
          return obj.update(values);
        }
        return oauth.create(values);
      })
  );
  return oauth;
};
