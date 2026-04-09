// Imports 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./userSchema'); // Ensure userSchema.js is in the same folder

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
// Using  Atlas URI with encoded password for special characters
const dbUser = "jhowland022";
const dbPass = encodeURIComponent("S1mp13loo!#@"); 
const mongoString = `mongodb+srv://${dbUser}:${dbPass}@homework2.sjonggp.mongodb.net/lab?retryWrites=true&w=majority`;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => console.log("MongoDB Error:", error));
database.once('connected', () => console.log('Database Connected Successfully'));
// --- USER SCHEMA (Requirement: f_name, l_name, username, password) ---
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;



// Signup Route
app.post('/createUser', async (req, res) => {
    console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username}`);
    const un = req.body.username;
    try {
        // Check if username already exists
        const result = await User.exists({ username: un });
        if (result === null) {
            const user = new User(req.body);
            await user.save();
            console.log(`User created! ${user}`);
            res.send(user);
        } else {
            console.log("Username already exists");
            res.status(500).send("Username already exists");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Login Route
app.get('/getUser', async (req, res) => {
    const { username, password } = req.query;
    console.log(`Login attempt for: ${username}`);
    try {
        const user = await User.findOne({ username, password });
        res.send(user); 
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start Server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
});