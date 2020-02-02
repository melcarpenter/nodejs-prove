const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const userEmail = sequelize.define('user_email', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    claimed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    claimCode: {
      type: Sequelize.STRING,
    },
    claimCodeExpiration: {
      type: Sequelize.DATE,
    },
  },
    {
      timestamp: true
    });
  userEmail.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
  };
  userEmail.upsert = (values, condition) => (
    userEmail.findOne({ where: condition })
      .then((obj) => {
        if (obj) {
          return obj.update(values);
        }
        return userEmail.create(values);
      })
  );
  return userEmail;
};
