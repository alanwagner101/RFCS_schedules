var db = require("../models");

module.exports = function(app) {
  
  app.get("/api/user", function(req, res) {
    db.User.findAll({}).then(function(UserDB) {
      res.json(UserDB);
    });
  });

  app.get("/api/users/:company", function() {
    db.User.findAll({ where: { company: req.param.company } }).then(function(UserDB) {
      res.json(UserDB);
    });
  });

  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(UserDB) {
      res.json(UserDB);
    });
  });

  app.delete("/api/user/:name", function(req, res) {
    db.User.destroy({ where: { name: req.params.name } }).then(function(UserDB) {
      res.json(UserDB);
    });
  });

};