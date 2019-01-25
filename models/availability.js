module.exports = function (sequelize, DataTypes) {

  var Availability = sequelize.define("Availability", {
    on: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    off: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 20],
          msg: "Time must be between 1 and 20 characters long."
        }
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 140],
          msg: "Message can only be between 1 and 140 characters long."
        }
      }
    }
  });

  Availability.associate = function (models) {
    Availability.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Availability;
};
