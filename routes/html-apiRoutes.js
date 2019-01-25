module.exports = function(app) {
	
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/calendar", function(req, res) {
    res.render("calendar");
  });
	
  app.get("*", function(req, res) {
    res.render("404");
  });

};