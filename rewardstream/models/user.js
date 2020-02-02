const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const user = sequelize.define('user', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    managed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      // allowNull: false,
      // unique: true,
      // validate: {
      //   isEmail: true
      // }
    },
    emailVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    resetPasswordToken: {
      type: Sequelize.STRING,
    },
    resetPasswordTokenExpiration: {
      type: Sequelize.DATE
    },
    twofactor: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    twofactorSecret: {
      type: Sequelize.STRING,
    },
    twofactorBackup: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    phoneConfirmed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    github: {
      type: Sequelize.STRING,
    },
    twitter: {
      type: Sequelize.STRING,
    },
    coinbase: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
    reddit: {
      type: Sequelize.STRING,
    },
    note: {
      type: Sequelize.STRING,
    },
    coinbaseCredentials: {
      type: Sequelize.TEXT,
      get() {
        if (this.getDataValue('coinbaseCredentials')) {
          return JSON.parse(this.getDataValue('coinbaseCredentials'));
        }
        return {};
      },
      set(value) {
        if (!value) value = {};
        this.setDataValue('coinbaseCredentials', JSON.stringify(value));
      },
    },
    facebookCredentials: {
      type: Sequelize.TEXT,
      get() {
        if (this.getDataValue('facebookCredentials')) {
          return JSON.parse(this.getDataValue('facebookCredentials'));
        }
        return {};
      },
      set(value) {
        if (!value) value = {};
        this.setDataValue('facebookCredentials', JSON.stringify(value));
      },
    },
    coinbaseVerificationLevel: {
      type: Sequelize.TEXT
    },
    riskScore: {
      type: Sequelize.INTEGER
    },
    clearbitId: {
      type: Sequelize.STRING
    },
    mousebeltUniversity: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    riskVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
    {
      timestamp: true
    });

  user.upsert = (values, condition) => (
    user.findOne({ where: condition })
      .then((obj) => {
        if (obj) {
          return obj.update(values);
        }
        return user.create(values);
      })
  );

  user.associate = function (models) {
    this.belongsTo(models.company, {
      foreignKey: {
        name: 'companyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.hasMany(models.user_email, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
    this.hasMany(models.balance, {
      foreignKey: {
        name: 'userId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.hasMany(models.distribution, {
      foreignKey: {
        name: 'userId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.hasMany(models.challenge_response, {
      foreignKey: {
        name: 'userId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };

  return user;
};
