// models/Route.js
const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  from: String,
  to: String
});

module.exports = mongoose.model("Route", routeSchema);
