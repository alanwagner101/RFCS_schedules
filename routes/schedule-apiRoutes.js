var db = require("../models");

module.exports = function(app) {
  app.get("/api/schedule", function(req, res) {
    db.Schedule.findAll({}).then(function(ScheduleDB) {
      res.json(ScheduleDB);
    });
  });

  app.post("/api/schedule", function(req, res) {
    db.Schedule.create(req.body).then(function(ScheduleDB) {
      res.json(ScheduleDB);
    });
  });

  app.delete("/api/schedule/:id", function(req, res) {
    db.Schedule.destroy({ where: { id: req.params.id } }).then(function(ScheduleDB) {
      res.json(ScheduleDB);
    });
  });
};