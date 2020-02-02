const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const challengeResponse = sequelize.define('challenge_response', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    status: {
      type: Sequelize.ENUM(),
      values: ['SUCCESSFUL', 'UNSUCCESSFUL', 'FAILED']
    }
  },
    {
      timestamp: true
    });

  challengeResponse.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });

    this.belongsTo(models.challenge, {
      foreignKey: {
        name: 'challengeId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };
  return challengeResponse;
};
