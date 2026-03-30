const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); // Essential for reading req.body
app.use(cors());         // Essential for React to talk to Node

// --- MONGODB ATLAS CONNECTION ---
const dbUser = "jhowland022";
const dbPass = encodeURIComponent("S1mp13loo!#@"); // Handles special characters
const dbName = "homework2_db"; // You can name this whatever you like

const mongoURI = `mongodb+srv://${dbUser}:${dbPass}@homework2.sjonggp.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

// --- USER SCHEMA (Requirement: f_name, l_name, username, password) ---
const userSchema = new mongoose.Schema({
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// --- API ROUTES ---

// 1. SIGNUP: Create a user document
app.post('/signup', async (req, res) => {
    try {
        const { f_name, l_name, username, password } = req.body;
        const newUser = new User({ f_name, l_name, username, password });
        await newUser.save();
        res.status(201).send("User Created Successfully");
    } catch (err) {
        res.status(400).send("Error: Username might already be taken.");
    }
});

// 2. LOGIN: Check username and match passwords
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (user && user.password === password) {
            // Success acknowledgement
            res.status(200).send("Login Successful!");
        } else {
            // Failure prompt
            res.status(401).send("Login Failed: Invalid credentials.");
        }
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// --- START SERVER ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});