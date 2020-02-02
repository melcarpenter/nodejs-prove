const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const challenge = sequelize.define('challenge', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    order: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT('medium')
    },
    videoUrl: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.TEXT('long'),
    },
    requiresVerification: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    maxCompletions: {
      type: Sequelize.INTEGER,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
    quiz: {
      type: Sequelize.STRING
    },
    quizAnswer: {
      type: Sequelize.STRING
    },
    cryptocurrencyAmount: {
      type: Sequelize.FLOAT
    },
    quizAnswers: {
      type: Sequelize.TEXT,
      get() {
        if (this.getDataValue('quizAnswers')) {
          return JSON.parse(this.getDataValue('quizAnswers'));
        }
        return {};
      },
      set(value) {
        if (!value) value = {};
        this.setDataValue('quizAnswers', JSON.stringify(value));
      },
    },
    quizQuestions: {
      type: Sequelize.TEXT,
      get() {
        if (this.getDataValue('quizQuestions')) {
          return JSON.parse(this.getDataValue('quizQuestions'));
        }
        return {};
      },
      set(value) {
        if (!value) value = {};
        this.setDataValue('quizQuestions', JSON.stringify(value));
      },
    },
    restrictedGroup: {
      type: Sequelize.ENUM(),
      values: ['MOUSEBELT_UNIVERSITY'],
      defaultValue: null
    },
    type: {
      type: Sequelize.ENUM(['tweet']),
      defaultValue: null
    },
  },
    {
      timestamp: true
    });

  challenge.associate = function (models) {
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
    this.hasMany(models.challenge_response, {
      foreignKey: {
        name: 'challengeId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };

  challenge.beforeCreate(async (model) => {
    const lastOrder = await challenge.findAll({
      order: [
        ['createdAt', 'DESC'],
      ]
    });
    model.order = lastOrder.length > 0 ? lastOrder[0].order + 100 : 0;
    return model;
  });
  return challenge;
};
