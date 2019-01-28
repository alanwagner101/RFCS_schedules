var db = require("../models");

module.exports = function(app) {
  
  app.get("/api/user", function(req, res) {
    db.User.findAll({}).then(function(UserDB) {
      res.json(UserDB);
    });
  });

  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(UserDB) {
      res.json(UserDB);
    });
  });

  app.delete("/api/user/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(UserDB) {
      res.json(UserDB);
    });
  });

};