// seed.js
const mongoose = require("mongoose");
const Route = require("./models/Route");

const MONGO_URI = "mongodb://127.0.0.1:27017/gobus";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("✅ Connected to MongoDB");

  // Sample routes to insert
  const sampleRoutes = [
    { from: "Chennai", to: "Bangalore" },
    { from: "Hyderabad", to: "Chennai" },
    { from: "Mumbai", to: "Pune" },
    { from: "Delhi", to: "Agra" }
  ];

  await Route.deleteMany({}); // clear old
  await Route.insertMany(sampleRoutes);

  console.log("🟢 Sample routes inserted");
  mongoose.disconnect();
}).catch(err => {
  console.error("❌ MongoDB seed error:", err);
});
