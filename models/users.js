module.exports = function (sequelize, DataTypes) {

  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 30],
          msg: "Name must be between 1 and 30 characters long."
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: "Email must be between 1 and 50 characters long."
        },
        isEmail: true
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          arg: [1, 20],
          msg: "Position must be between 1 and 20 characters long."
        }
      }
    },
    pin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: {
          arg: [4, 4],
          msg: "Pin must be exactly 4 digis long."
        }
      }
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Schedule, {
      onDelete: "CASCADE"
    });

    User.hasMany(models.Availability, {
      onDelete: "CASCADE"
    });
  };

  return User;

};