module.exports = function(req, res) {
  console.log("FROM TEST:", req);
  res.redirect("/yo");
}
