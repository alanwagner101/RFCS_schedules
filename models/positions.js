module.exports = function(sequelize, DataTypes) {

  var Positions = sequelize.define("Positions", {
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 20],
          msg: "Position must be between 1 and 20 characters."
        }
      }
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 30],
          msg: "Company must be between 1 and 30 characters long."
        }
      }
    },
  });

  Positions.associate = function(models) {
    Positions.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Positions;
};