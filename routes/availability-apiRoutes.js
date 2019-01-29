var db = require("../models");

module.exports = function(app) {
  app.get("/api/availability", function(req, res) {
    db.Availability.findAll({}).then(function(AvailabilityDB) {
      res.json(AvailabilityDB);
    });
  });

  app.post("/api/availability", function(req, res) {
    db.Availability.create(req.body).then(function(AvailabilityDB) {
      res.json(AvailabilityDB);
    });
  });

  app.delete("/api/availability/:id", function(req, res) {
    db.Availability.destroy({ where: { id: req.params.id } }).then(function(AvailabilityDB) {
      res.json(AvailabilityDB);
    });
  });
};