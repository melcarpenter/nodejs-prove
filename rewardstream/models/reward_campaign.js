const Sequelize = require('sequelize');
const { CAMPAIGN_DISTRIBUTION_METHOD, CAMPAIGN_IDENTITY_TYPE, CAMPAIGN_INTEGRATION_TYPE } = require('../constants');

module.exports = function (sequelize) {
  const rewardCampaign = sequelize.define('reward_campaign', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    distributionMethod: {
      type: Sequelize.ENUM(Object.values(CAMPAIGN_DISTRIBUTION_METHOD)),
      defaultValue: CAMPAIGN_DISTRIBUTION_METHOD.RAFFLE
    },
    identityType: {
      type: Sequelize.ENUM(Object.values(CAMPAIGN_IDENTITY_TYPE)),
      defaultValue: CAMPAIGN_IDENTITY_TYPE.USERID
    },
    name: {
      type: Sequelize.STRING,
    },
    limit: {
      type: Sequelize.INTEGER,
    },
    // integration fields
    integrationType: {
      type: Sequelize.ENUM(Object.values(CAMPAIGN_INTEGRATION_TYPE)),
      defaultValue: CAMPAIGN_INTEGRATION_TYPE.SURVEYMONKEY
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
    challengeId: {
      type: Sequelize.INTEGER
    },
  },
    {
      timestamp: true
    });

  rewardCampaign.associate = function (models) {
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
    this.belongsTo(models.reward, {
      foreignKey: {
        name: 'rewardId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
    this.hasMany(models.integration_response, {
      foreignKey: {
        name: 'rewardCampaignId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };

  return rewardCampaign;
};
