module.exports = function(sequelize, DataTypes) {

  var Schedule = sequelize.define("Schedule", {
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        len: {
          args: [8, 8],
          msg: "Date must be set up as such: MMDDYYYY"
        }
      }
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: "Time must be between 1 and 50 characters long."
        }
      }
    }
  });

  Schedule.associate = function(models) {
    Schedule.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Schedule;
};