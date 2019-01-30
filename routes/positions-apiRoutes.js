var db = require("../models");

module.exports = function(app) {
  app.get("/api/positions", function(req, res) {
    db.Positions.findAll({}).then(function(PositionsDB) {
      res.json(PositionsDB);
    });
  });

  app.post("/api/positions", function(req, res) {
    db.Positions.create(req.body).then(function(PositionsDB) {
      res.json(PositionsDB);
    });
  });

  app.delete("/api/positions/:position", function(req, res) {
    db.Positions.destroy({ where: { position: req.params.position } }).then(function(PositionsDB) {
      res.json(PositionsDB);
    });
  });
};