const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const integrationResponse = sequelize.define('integration_response', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    properties: {
      type: Sequelize.TEXT,
      get() {
        if (this.getDataValue('properties')) {
          return JSON.parse(this.getDataValue('properties'));
        }
        return null;
      },
      set(value) {
        this.setDataValue('properties', JSON.stringify(value));
      },
    },
    responseId: {
      type: Sequelize.STRING,
    },
    identity: {
      type: Sequelize.STRING
    },
    processed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
    {
      timestamp: true
    });

  integrationResponse.associate = function (models) {
    this.belongsTo(models.distribution, {
      foreignKey: {
        name: 'distributionId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.belongsTo(models.reward_campaign, {
      foreignKey: {
        name: 'rewardCampaignId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };
  return integrationResponse;
};
