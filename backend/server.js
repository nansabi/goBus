// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Route = require('./models/Route'); // 👈 make sure this exists

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
const MONGO_URI = "mongodb://127.0.0.1:27017/gobus";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to local MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Route: Get available bus routes
app.get('/api/routes', async (req, res) => {
  const from = req.query.from?.trim();
  const to = req.query.to?.trim();

  try {
    const routes = await Route.find({
      from: { $regex: new RegExp(`^${from}$`, 'i') },
      to: { $regex: new RegExp(`^${to}$`, 'i') }
    });

    const busOptions = [];
    for (const route of routes) {
      busOptions.push({
        from: route.from,
        to: route.to,
        price: "₹699",
        type: "AC Sleeper",
        timing: "6:00 PM - 11:30 PM"
      });
      busOptions.push({
        from: route.from,
        to: route.to,
        price: "₹799",
        type: "Volvo Multi-Axle",
        timing: "7:00 PM - 12:00 AM"
      });
      busOptions.push({
        from: route.from,
        to: route.to,
        price: "₹649",
        type: "Non-AC Seater",
        timing: "5:30 PM - 11:00 PM"
      });
    }

    res.json({ routes: busOptions });
  } catch (err) {
    console.error("❌ Error fetching routes:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ Route: Handle bookings
app.post('/api/bookings', (req, res) => {
  const { upiId, from, to, seats } = req.body;

  if (!upiId || !from || !to || !seats || seats.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid booking data" });
  }

  console.log("✅ Booking received:", { upiId, from, to, seats });

  // Here, you can save to MongoDB if needed.

  res.json({ success: true, message: "Booking successful" });
});

// ✅ Logging middleware (optional)
app.use((req, res, next) => {
  console.log("👉 Incoming request:", req.method, req.url);
  next();
});
app.get('/test', (req, res) => {
  res.send("🟢 Server working fine!");
});
const User = require('./models/User');

// Signup route
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 GoBus backend running at http://localhost:${PORT}`);
});
