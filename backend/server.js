
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



const app = express();
// CORS configuration
const corsOptions = {
    origin: "https://fitfloww-frontend.onrender.com",  // Replace with your frontend domain URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Add the necessary methods you want to allow
    credentials: true, // If you are using cookies or sessions
  };
  
app.use(cors(corsOptions));
app.use(express.json());

// No dotenv now — using hardcoded URI
const MONGO_URI = "mongodb+srv://ujjawal:<ujjawal21mongo>@cluster0.dgquhlp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Your MongoDB URI
const PORT = process.env.port || 5000; // Your server port

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error: ", err));

// Basic route
app.get("/", (req, res) => {
    res.send("Welcome to FitFlow API");
});

// Routes
console.log("🔁 Registering routes...");
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
