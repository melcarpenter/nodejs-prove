const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const billing = sequelize.define('billing', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
  });
  billing.associate = function (models) {
    this.belongsTo(models.company, {
      foreignKey: {
        name: 'companyId',
        allowNull: true
      },
      onDelete: 'SET NULL'
    });
  };

  return billing;
};
