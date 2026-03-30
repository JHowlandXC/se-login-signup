const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 1. MongoDB Connection (Replace with your URI)
mongoose.connect('mongodb://localhost:27017/usersDB');

// 2. User Schema (Matching Assignment Requirements)
const userSchema = new mongoose.Schema({
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// 3. Signup Route
app.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send("User Created Successfully");
    } catch (err) {
        res.status(400).send("Error creating user: " + err.message);
    }
});

// 4. Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (user && user.password === password) {
        res.status(200).send("Login Successful!");
    } else {
        res.status(401).send("Login Failed: Invalid credentials.");
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));